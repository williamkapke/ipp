'use strict';

const tags = require('./tags');

const message = (host, operation, id) => {
  const buf = Buffer.alloc(1024);
  let position = 0;

  const write1 = (val) => {
    buf.writeUInt8(val, position);
    position += 1;
  };
  const write2 = (val) => {
    buf.writeUInt16BE(val, position);
    position += 2;
  };
  const write4 = (val) => {
    buf.writeUInt32BE(val, position);
    position += 4;
  };
  const write = (str) => {
    const length = Buffer.byteLength(str);

    write2(length);
    buf.write(str, position, length);
    position += length;
  };
  const attr = (tag, name, values) => {
    write1(tag);
    write(name);
    for (let i = 0; i < values.length; i++) {
      write(values[i]);
    }
  };

  // http://tools.ietf.org/html/rfc2910#section-3.1.1
  //	-----------------------------------------------
  //	|                  version-number             |   2 bytes  - required
  //	-----------------------------------------------
  //	|               operation-id (request)        |
  //	|                      or                     |   2 bytes  - required
  //	|               status-code (response)        |
  //	-----------------------------------------------
  //	|                   request-id                |   4 bytes  - required
  //	-----------------------------------------------
  //	|                 attribute-group             |   n bytes - 0 or more
  //	-----------------------------------------------
  //	|              end-of-attributes-tag          |   1 byte   - required
  //	-----------------------------------------------
  //	|                     data                    |   q bytes  - optional
  //	-----------------------------------------------

  // version 2.0
  write2(0x0200);
  write2(operation);

  // request-id
  write4(id);

  // the required stuff...
  // 0x01
  write1(tags['operation-attributes-tag']);
  attr(tags.charset, 'attributes-charset', ['utf-8']);
  attr(tags.naturalLanguage, 'attributes-natural-language', ['en-us']);
  attr(tags.uri, 'printer-uri', [`ipp://${host}`]);

  // end
  write1(0x03);

  return buf.slice(0, position);
};

module.exports = message;
