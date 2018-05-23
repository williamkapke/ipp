'use strict';

const PassThrough = require('stream').PassThrough;
const url = require('url');

const assert = require('assertthat');
const express = require('express');
const freeport = require('freeport');
const rawBody = require('raw-body');

const request = require('../../lib/request');
const serializer = require('../../lib/serializer');

const assertBufferEqual = function (buf1, buf2) {
  assert.that(buf1.length).is.equalTo(buf2.length);
  for (let i = 0; i < buf1.length; i++) {
    assert.that(buf1[i]).is.equalTo(buf2[i]);
  }

  return true;
};

suite('request', () => {
  let port;
  let requestMsg;
  let responseMsg;

  setup((done) => {
    freeport((errPort, aFreePort) => {
      assert.that(errPort).is.null();

      port = aFreePort;
      requestMsg = {
        version: '2.0',
        operation: 'Get-Job-Attributes',
        id: 987,
        'operation-attributes-tag': {
          // these are required to be in this order
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en-us',
          'job-uri': `ipp://localhost:${port}/jobs/06acd811-fe8a-407f-9fd3-628f0c23c1d8`
        }
      };
      responseMsg = {
        version: '2.0',
        statusCode: 'successful-ok',
        id: 987,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en'
        },
        'job-attributes-tag': {
          'job-id': 111,
          'job-state': 'processing',
          'job-uri': `ipp://localhost:${port}/jobs/06acd811-fe8a-407f-9fd3-628f0c23c1d8`
        }
      };
      done();
    });
  });

  test('is a function', (done) => {
    assert.that(request).is.ofType('function');
    done();
  });

  test('POST buffer data', (done) => {
    const reqBuf = serializer(requestMsg);
    const app = express();

    app.post('/jobs/:job', (req, res) => {
      assert.that(req.params.job).is.equalTo('06acd811-fe8a-407f-9fd3-628f0c23c1d8');
      assert.that(req.headers['transfer-encoding']).is.equalTo('chunked');
      rawBody(req, {}, (errBody, body) => {
        assert.that(errBody).is.null();
        assertBufferEqual(body, reqBuf);
        res.end(serializer(responseMsg));
      });
    });

    app.listen(port, (errListen) => {
      assert.that(errListen).is.undefined();

      request(url.parse(requestMsg['operation-attributes-tag']['job-uri']), reqBuf, (errRequest, res) => {
        assert.that(res).is.equalTo(responseMsg);
        done();
      });
    });
  });

  test('POST stream data', (done) => {
    const myStream = new PassThrough();
    const reqBuf = serializer(requestMsg);
    const app = express();

    app.post('/jobs/:job', (req, res) => {
      assert.that(req.params.job).is.equalTo('06acd811-fe8a-407f-9fd3-628f0c23c1d8');
      assert.that(req.headers['transfer-encoding']).is.equalTo('chunked');
      rawBody(req, {}, (errBody, body) => {
        assert.that(errBody).is.null();
        assertBufferEqual(body, reqBuf);
        res.end(serializer(responseMsg));
      });
    });

    app.listen(port, (errListen) => {
      assert.that(errListen).is.undefined();

      request(url.parse(requestMsg['operation-attributes-tag']['job-uri']), myStream, (errRequest, res) => {
        assert.that(res).is.equalTo(responseMsg);
        done();
      });
      myStream.write(reqBuf);
      myStream.end();
    });
  });
});
