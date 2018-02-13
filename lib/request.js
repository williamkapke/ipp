'use strict';

const http = require('http'),
      https = require('https'),
      url = require('url');

const parse = require('./parser');

const IppResponseError = (statusCode, message) => {
  this.name = 'IppResponseError';
  this.statusCode = statusCode;
  this.message = message || `Received unexpected response status ${statusCode} from the printer`;
  this.stack = new Error().stack;
};

IppResponseError.prototype = Object.create(Error.prototype);
IppResponseError.prototype.constructor = IppResponseError;

const readResponse = (res, cb) => {
  const chunks = [];
  let length = 0;

  res.on('data', (chunk) => {
    length += chunk.length;
    chunks.push(chunk);
  });
  res.on('end', () => {
    const response = parse(Buffer.concat(chunks, length));

    delete response.operation;
    cb(null, response);
  });
};

const request = (opts, buffer, cb) => {
  // const streamed = typeof buffer === 'function';

  // All IPP requires are POSTs- so we must have some data.
  //  10 is just a number I picked- this probably should have something more meaningful

  if (!Buffer.isBuffer(buffer) || buffer.length < 10) {
    return cb(new Error('Data required'));
  }
  if (typeof opts === 'string') {
    opts = url.parse(opts);
  }
  if (!opts.port) {
    opts.port = 631;
  }

  if (!opts.headers) {
    opts.headers = {};
  }
  opts.headers['Content-Type'] = 'application/ipp';
  opts.method = 'POST';

  if (opts.protocol === 'ipp:') {
    opts.protocol = 'http:';
  }

  if (opts.protocol === 'ipps:') {
    opts.protocol = 'https:';
  }

  const req = (opts.protocol === 'https:' ? https : http).request(opts, (res) => {
    //		console.log('STATUS: ' + res.statusCode);
    //		console.log('HEADERS: ' + JSON.stringify(res.headers));
    switch (res.statusCode) {
      case 100:
        if (opts.headers.Expect !== '100-Continue' || typeof opts.continue !== 'function') {
          cb(new IppResponseError(res.statusCode));
        }

        // console.log('100 Continue');
        return;
      case 200:
        return readResponse(res, cb);
      default:
        cb(new IppResponseError(res.statusCode));

      // console.log(res.statusCode, 'response');
    }
  });

  req.on('error', (err) => {
    cb(err);
  });
  if (opts.headers.Expect === '100-Continue' && typeof opts.continue === 'function') {
    req.on('continue', () => {
      opts.continue(req);
    });
  }
  req.write(buffer);
  req.end();
};

module.exports = request;
