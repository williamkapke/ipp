'use strict';

const { Transform } = require('stream');

const parse = require('./parser');

class StreamParser extends Transform {
  constructor (options) {
    super(options);
    this.buf = Buffer.alloc(0);
  }

  _transform (data, encoding, callback) {
    if (!this.buf) {
      return callback(null, data);
    }
    this.buf = Buffer.concat([this.buf, data]);

    try {
      const message = parse(this.buf);
      const streamData = message.data;

      delete message.data;
      this.buf = null;
      this.emit('attributes', message);

      if (streamData && streamData.length > 0) {
        return callback(null, streamData);
      }

      return callback(null);
    } catch (e) {
      if (e.message === 'NotEnoughData') {
        return callback(null);
      }

      return callback(e);
    }
  }
}

module.exports = StreamParser;
