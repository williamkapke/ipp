'use strict';

const attributes = require('./attributes');
const enums = require('./enums');
const keywords = require('./keywords');
const operations = require('./enums')['operations-supported'];
const cupsOperations = require('./enums')['cups-operations-supported'];
const statusCodes = require('./statusCodes');
const tags = require('./tags');
const versions = require('./versions');

const isReadableStream = require('./isReadableStream');

const RS = '\u001e';

const random = () => {
  return Number(
    Math.random().
      toString().
      substr(-8)
  );
};

const timezone = (d) => {
  const z = d.getTimezoneOffset();

  return [z > 0 ? '-' : '+', ~~(Math.abs(z) / 60), Math.abs(z) % 60];
};

const serializer = (msg) => {
  let buf = Buffer.alloc(10240);
  let position = 0;

  const checkBufferSize = (length) => {
    if (position + length > buf.length) {
      buf = Buffer.concat([buf], 2 * buf.length);
    }
  };

  const write1 = (val) => {
    checkBufferSize(1);
    buf.writeUInt8(val, position);
    position += 1;
  };

  const write2 = (val) => {
    checkBufferSize(2);
    buf.writeUInt16BE(val, position);
    position += 2;
  };

  const write4 = (val) => {
    checkBufferSize(4);
    buf.writeUInt32BE(val, position);
    position += 4;
  };

  // write a string to the buffer
  const writeStr = (str, enc) => {
    const length = Buffer.byteLength(str);

    checkBufferSize(length);
    buf.write(str, position, length, enc || 'utf8');
    position += length;
  };

  // write a string to the buffer, prefixing it with the size of the buffer
  const write = (str, enc) => {
    const length = Buffer.byteLength(str);

    write2(length);
    checkBufferSize(length);
    buf.write(str, position, length, enc || 'utf8');
    position += length;
  };

  const special = { 'attributes-charset': 1, 'attributes-natural-language': 2 };

  const groupmap = {
    'job-attributes-tag': ['Job Template', 'Job Description'],
    'operation-attributes-tag': 'Operation',
    'printer-attributes-tag': 'Printer Description',
    'unsupported-attributes-tag': '',
    'subscription-attributes-tag': 'Subscription Description',
    'event-notification-attributes-tag': 'Event Notifications',
    'resource-attributes-tag': '',
    'document-attributes-tag': 'Document Description'
  };

  const resolveAlternates = (array, name, value) => {
    switch (array.alts) {
      case 'keyword,name':
      case 'keyword,name,novalue':
        if (value === null && array.lookup.novalue) {
          return array.lookup.novalue;
        }

        return keywords[name].indexOf(value) !== -1 ? array.lookup.keyword : array.lookup.name;

      case 'integer,rangeOfInteger':
        return Array.isArray(value) ? array.lookup.rangeOfInteger : array.lookup.integer;

      case 'dateTime,novalue':
        return !isNaN(Date.parse(value)) ? array.lookup.dateTime : array.lookup.novalue;

      case 'integer,novalue':
        return !isNaN(value) ? array.lookup.integer : array.lookup.novalue;

      case 'name,novalue':
        return value !== null ? array.lookup.name : array.lookup.novalue;

      case 'novalue,uri':
        return value !== null ? array.lookup.uri : array.lookup.novalue;

      case 'enumeration,unknown':
        return enums[name][value] ? array.lookup.enumeration : array.lookup.unknown;

      case 'enumeration,novalue':
        return value !== null ? array.lookup.enumeration : array.lookup.novalue;

      case 'collection,novalue':
        return value !== null ? array.lookup.enumeration : array.lookup.novalue;

      default:
        throw new Error('Unknown atlernates');
    }
  };

  const getTag = (syntax, name, value) => {
    let tag = syntax.tag;

    if (!tag) {
      const hasRS = Boolean(value.indexOf(RS) !== -1);

      tag = tags[`${syntax.type + (hasRS ? 'With' : 'Without')}Language`];
    }

    return tag;
  };

  const writeValue = (tag, value, submembers) => {
    let parts,
        tz;

    switch (tag) {
      case tags.enum:
        write2(0x0004);
        write4(value);

        return;

      case tags.integer:
        write2(0x0004);
        write4(value);

        return;

      case tags.boolean:
        write2(0x0001);

        write1(Number(value));

        return;

      case tags.rangeOfInteger:
        write2(0x0008);
        write4(value[0]);
        write4(value[1]);

        return;

      case tags.resolution:
        write2(0x0009);
        write4(value[0]);
        write4(value[1]);
        write1(value[2] === 'dpi' ? 0x03 : 0x04);

        return;

      case tags.dateTime:
        write2(0x000b);
        write2(value.getFullYear());
        write1(value.getMonth() + 1);
        write1(value.getDate());
        write1(value.getHours());
        write1(value.getMinutes());
        write1(value.getSeconds());
        write1(Math.floor(value.getMilliseconds() / 100));
        tz = timezone(value);

        // + or -
        writeStr(tz[0]);

        // hours
        write1(tz[1]);

        // minutes
        write1(tz[2]);

        return;

      case tags.textWithLanguage:
      case tags.nameWithLanguage:
        parts = value.split(RS);

        write2(parts[0].length);
        write2(parts[0]);
        write2(parts[1].length);
        write2(parts[1]);

        return;

      case tags.nameWithoutLanguage:
      case tags.textWithoutLanguage:
      case tags.octetString:
      case tags.memberAttrName:
        return write(value);

      case tags.keyword:
      case tags.uri:
      case tags.uriScheme:
      case tags.charset:
      case tags.naturalLanguage:
      case tags.mimeMediaType:
        return write(value, 'ascii');

      case tags.begCollection:
        // empty value
        write2(0);
        /* eslint-disable no-use-before-define */
        writeCollection(value, submembers);
        /* eslint-enable no-use-before-define */

        return;

      case tags['no-value']:
        // empty value? I can't find where this is defined in any spec.
        return write2(0);

      default:
        throw new Error(`${tag} not handled`);
    }
  };

  const writeCollection = (value, members) => {
    Object.keys(value).forEach((key) => {
      let subvalue = value[key];
      let subsyntax = members[key];

      if (Array.isArray(subsyntax)) {
        subsyntax = resolveAlternates(subsyntax, key, subvalue);
      }

      const tag = getTag(subsyntax, key, subvalue);

      if (tag === tags.enum) {
        subvalue = enums[key][subvalue];
      }

      write1(tags.memberAttrName);

      // empty name
      write2(0);
      writeValue(tags.memberAttrName, key);
      write1(tag);

      // empty name
      write2(0);
      writeValue(tag, subvalue, subsyntax.members);
    });
    write1(tags.endCollection);

    // empty name
    write2(0);

    // empty value
    write2(0);
  };

  const attr = (group, name, obj) => {
    const groupName = Array.isArray(group) ?
      group.find((grp) => {
        return attributes[grp][name];
      }) :
      group;

    if (!groupName) {
      throw new Error(`Unknown attribute: ${name}`);
    }

    const syntax = attributes[groupName][name];

    if (!syntax) {
      throw new Error(`Unknown attribute: ${name}`);
    }

    let values = obj[name];

    if (!Array.isArray(values)) {
      values = [values];
    }

    values.forEach((value, i) => {
      // we need to re-evaluate the alternates every time
      const syntax2 = Array.isArray(syntax) ? resolveAlternates(syntax, name, value) : syntax;
      const tag = getTag(syntax2, name, value);

      if (tag === tags.enum) {
        value = enums[name][value];
      }

      write1(tag);
      if (i === 0) {
        write(name);
      } else {
        // empty name
        write2(0x0000);
      }

      writeValue(tag, value, syntax2.members);
    });
  };

  const writeGroup = (tag) => {
    // support writing multiple sets of the same group with an Array
    const groupsOrAttrs = msg[tag];

    if (!groupsOrAttrs) {
      return;
    }

    const attributeGroups = Array.isArray(groupsOrAttrs) ? groupsOrAttrs : [groupsOrAttrs];

    const groupname = groupmap[tag];

    attributeGroups.forEach((attrs) => {
      let keys = Object.keys(attrs);

      // 'attributes-charset' and 'attributes-natural-language' need to come first- so we sort them to the front
      if (tag === tags['operation-attributes-tag']) {
        keys = keys.sort((a, b) => {
          return (special[a] || 3) - (special[b] || 3);
        });
      }

      write1(tags[tag]);
      keys.forEach((name) => {
        attr(groupname, name, attrs);
      });
    });
  };

  write2(versions[msg.version || '2.0']);
  write2(msg.operation ? operations[msg.operation] || cupsOperations[msg.operation] : statusCodes[msg.statusCode]);

  // request-id
  write4(msg.id || random());

  writeGroup('operation-attributes-tag');
  writeGroup('job-attributes-tag');
  writeGroup('printer-attributes-tag');
  writeGroup('document-attributes-tag');
  writeGroup('subscription-attributes-tag');

  /* eslint-disable no-warning-comments */
  // TODO... add the others
  /* eslint-enable no-warning-comments */

  // end
  write1(0x03);

  if (!msg.data || isReadableStream(msg.data)) {
    return buf.slice(0, position);
  }

  if (!Buffer.isBuffer(msg.data)) {
    throw new Error('Data must be a Buffer or a stream.Readable.');
  }

  const buf2 = Buffer.alloc(position + msg.data.length);

  buf.copy(buf2, 0, 0, position);
  msg.data.copy(buf2, position, 0);

  return buf2;
};

module.exports = serializer;
