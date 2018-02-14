'use strict';

const PassThrough = require('stream').PassThrough;

const assert = require('assertthat');

const ipp = require('../../ipp');

const assertBufferEqual = function (buf1, buf2) {
  assert.that(buf1.length).is.equalTo(buf2.length);
  for (let i = 0; i < buf1.length; i++) {
    assert.that(buf1[i]).is.equalTo(buf2[i]);
  }

  return true;
};

suite('serializer', () => {
  let msg;
  let result;

  setup((done) => {
    msg = {
      id: 42,
      'operation-attributes-tag': {
        'job-name': 'Hugos Job'
      }
    };
    result = Buffer.from([
      2, 0, 0, 0, 0, 0, 0, 42,
      1, 66, 0, 8, 106, 111, 98, 45,
      110, 97, 109, 101, 0, 9, 72, 117,
      103, 111, 115, 32, 74, 111, 98, 3]);
    done();
  });

  test('is an object', (done) => {
    assert.that(ipp).is.ofType('object');
    done();
  });

  test('returns buffer', (done) => {
    const buf = ipp.serialize(msg);

    assertBufferEqual(buf, result);
    done();
  });

  test('ignores stream', (done) => {
    msg.data = new PassThrough();

    msg.data.write('huhu');

    const buf = ipp.serialize(msg);

    assertBufferEqual(buf, result);
    done();
  });

  test('adds buffer data', (done) => {
    msg.data = Buffer.from('abc', 'ascii');

    const buf = ipp.serialize(msg);
    const resultWithData = Buffer.concat([result, msg.data]);

    assert.that(buf.length).is.equalTo(result.length + 3);
    assertBufferEqual(buf, resultWithData);
    done();
  });
});
