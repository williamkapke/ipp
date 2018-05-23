'use strict';

const enums = require('./enums'),
      statusCodes = require('./statusCodes'),
      tags = require('./tags');

const operations = enums['operations-supported'],
      RS = '\u001e';

const parser = (buf) => {
  const obj = {};
  let position = 0;
  const encoding = 'utf8';

  const read1 = () => {
    if (position + 1 > buf.length) {
      throw new Error('NotEnoughData');
    }

    return buf[position++];
  };

  const read2 = () => {
    if (position + 2 > buf.length) {
      throw new Error('NotEnoughData');
    }
    const val = buf.readInt16BE(position, true);

    position += 2;

    return val;
  };

  const read4 = () => {
    if (position + 4 > buf.length) {
      throw new Error('NotEnoughData');
    }
    const val = buf.readInt32BE(position, true);

    position += 4;

    return val;
  };

  const read = (length, enc) => {
    if (length === 0) {
      return '';
    }
    if (position + length > buf.length) {
      throw new Error('NotEnoughData');
    }
    const start = position;

    position += length;

    return buf.toString(enc || encoding, start, position);
  };

  const readValue = (tag, name) => {
    const length = read2();
    let date,
        lang,
        subval,
        val;

    // http://tools.ietf.org/html/rfc2910#section-3.9

    switch (tag) {
      case tags.enum:
        val = read4();

        return (enums[name] && enums[name].lookup[val]) || val;
      case tags.integer:
        return read4();

      case tags.boolean:
        return Boolean(read1());

      case tags.rangeOfInteger:
        return [read4(), read4()];

      case tags.resolution:
        return [read4(), read4(), read1() === 0x03 ? 'dpi' : 'dpcm'];

      case tags.dateTime:
        // http://tools.ietf.org/html/rfc1903 page 17
        date = new Date(read2(), read1(), read1(), read1(), read1(), read1(), read1());

        // silly way to add on the timezone

        return new Date(
          `${date.
            toISOString().
            substr(0, 23).
            replace('T', ',')},${String.fromCharCode(read(1))}${read(1)}:${read(1)}`
        );

      case tags.textWithLanguage:
      case tags.nameWithLanguage:
        lang = read(read2());
        subval = read(read2());

        return lang + RS + subval;

      case tags.nameWithoutLanguage:
      case tags.textWithoutLanguage:
      case tags.octetString:
      case tags.memberAttrName:
        return read(length);

      case tags.keyword:
      case tags.uri:
      case tags.uriScheme:
      case tags.charset:
      case tags.naturalLanguage:
      case tags.mimeMediaType:
        return read(length, 'ascii');

      case tags.begCollection:
        // the spec says a value could be present- but can be ignored
        read(length);

        /* eslint-disable no-use-before-define */
        return readCollection();
      /* eslint-enable no-use-before-define */

      case tags['no-value']:
      default:
        return module.exports.handleUnknownTag(tag, name, length, read);
    }
  };

  const hasAdditionalValue = () => {
    const current = buf[position];

    return (

      // tags.memberAttrName
      current !== 0x4a &&

      // tags.endCollection
      current !== 0x37 &&

      // tags.end-of-attributes-tag
      current !== 0x03 &&
      buf[position + 1] === 0x00 &&
      buf[position + 2] === 0x00
    );
  };

  const readValues = (type, name) => {
    let value = readValue(type, name);

    if (hasAdditionalValue()) {
      value = [value];
      do {
        type = read1();

        // empty name
        read2();
        value.push(readValue(type, name));
      } while (hasAdditionalValue());
    }

    return value;
  };

  const readAttr = (group) => {
    let tag = read1();

    /* eslint-disable no-warning-comments */
    // TODO: find a test for this
    /* eslint-enable no-warning-comments */

    if (tag === 0x7f) {
      // tags.extension
      tag = read4();
    }
    const name = read(read2());

    group[name] = readValues(tag, name);
  };

  const readGroup = (group) => {
    const name = tags.lookup[group];

    group = {};
    if (obj[name]) {
      if (!Array.isArray(obj[name])) {
        obj[name] = [obj[name]];
      }
      obj[name].push(group);
    } else {
      obj[name] = group;
    }

    if (position >= buf.length) {
      throw new Error('NotEnoughData');
    }
    while (buf[position] >= 0x0f) {
      // delimiters are between 0x00 to 0x0F
      readAttr(group);
    }
  };

  const readGroups = () => {
    let group;

    /* eslint-disable no-cond-assign */
    while (position < buf.length && (group = read1()) !== 0x03) {
      /* eslint-enable no-cond-assign */
      // end-of-attributes-tag
      readGroup(group);
    }
    if (group !== 0x03) {
      throw new Error('NotEnoughData');
    }
  };

  const readCollectionItemValue = (name) => {
    let tag = read1();

    /* eslint-disable no-warning-comments */
    // TODO: find a test for this
    /* eslint-enable no-warning-comments */

    if (tag === 0x7f) {
      // tags.extension
      tag = read4();
    }

    // read valuetag name and discard it
    read(read2());

    return readValues(tag, name);
  };

  const readCollection = () => {
    let tag;
    const collection = {};

    /* eslint-disable no-cond-assign */
    while ((tag = read1()) !== 0x37) {
      /* eslint-enable no-cond-assign */
      // tags.endCollection
      if (tag !== 0x4a) {
        throw new Error(`unexpected: ${tags.lookup[tag]}`);
      }

      // read nametag name and discard it
      read(read2());
      const name = readValue(0x4a);
      const values = readCollectionItemValue();

      collection[name] = values;
    }

    // Read endCollection name & value and discard it.
    // The spec says that they MAY have contents in the
    // future- so we can't assume they are empty.
    read(read2());
    read(read2());

    return collection;
  };

  obj.version = `${read1()}.${read1()}`;
  const bytes2and3 = read2();

  // byte[2] and byte[3] are used to define the 'operation' on
  // requests, but used to hold the statusCode on responses. We
  // can almost detect if it is a req or a res- but sadly, six
  // values overlap. In these cases, the parser will give both and
  // the consumer can ignore (or delete) whichever they don't want.

  if (bytes2and3 >= 0x02 || bytes2and3 <= 0x3d) {
    obj.operation = operations.lookup[bytes2and3];
  }

  if (bytes2and3 <= 0x0007 || bytes2and3 >= 0x0400) {
    obj.statusCode = statusCodes.lookup[bytes2and3];
  }
  obj.id = read4();
  readGroups();

  if (position < buf.length) {
    obj.data = buf.slice(position);
  }

  return obj;
};

module.exports = parser;

module.exports.handleUnknownTag = (tag, name, length, read) => {
  const value = length ? read(length) : undefined;

  throw new Error(`The spec is not clear on how to handle tag ${tag}: ${name}=${String(value)}. Please open a github issue to help find a solution!`);
};

