'use strict';

const parseurl = require('url').parse;
const { PassThrough } = require('stream');

const extend = require('./ipputil').extend;
const request = require('./request');
const serialize = require('./serializer');
const isReadableStream = require('./isReadableStream');

/* eslint-disable no-implicit-globals */
/* eslint-disable func-style */
function Printer (url, opts) {
  /* eslint-enable no-implicit-globals */
  /* eslint-enable func-style */
  if (!(this instanceof Printer)) {
    return new Printer(url, opts);
  }
  opts = opts || {};
  this.url = typeof url === 'string' ? parseurl(url) : url;
  this.version = opts.version || '2.0';
  this.uri = opts.uri || `ipp://${this.url.host}${this.url.path}`;
  this.charset = opts.charset || 'utf-8';
  this.language = opts.language || 'en-us';
  this.url.auth = opts.auth;
}

Printer.prototype = {
  message (operation, msg) {
    if (typeof operation === 'undefined') {
      operation = 'Get-Printer-Attributes';
    }

    const base = {
      version: this.version,
      operation,

      // will get added by serializer if one isn't given
      id: null,
      'operation-attributes-tag': {
        // these are required to be in this order
        'attributes-charset': this.charset,
        'attributes-natural-language': this.language,
        'printer-uri': this.uri
      }
    };

    // these are required to be in this order

    if (msg && msg['operation-attributes-tag']['job-id']) {
      base['operation-attributes-tag']['job-id'] = msg['operation-attributes-tag']['job-id'];
    } else if (msg && msg['operation-attributes-tag']['job-uri']) {
      // yes, this gets done in extend() - however, by doing this now, we define the position in the result object.
      base['operation-attributes-tag']['job-uri'] = msg['operation-attributes-tag']['job-uri'];
    }

    msg = extend(base, msg);
    if (msg['operation-attributes-tag']['job-uri']) {
      delete msg['operation-attributes-tag']['printer-uri'];
    }

    return msg;
  },
  execute (operation, msg, cb) {
    msg = this.message(operation, msg);
    const buf = serialize(msg);

    //		console.log(buf.toString('hex'));
    //		console.log(JSON.stringify(
    //			require('./parser')(buf), null, 2
    //		));

    if (msg.data && isReadableStream(msg.data)) {
      const stream = new PassThrough();

      request(this.url, stream, cb);
      stream.write(buf);

      return msg.data.pipe(stream);
    }
    request(this.url, buf, cb);
  }
};

module.exports = Printer;
