'use strict';

const assert = require('assertthat');

const statusCodes = require('../../lib/statusCodes');

suite('statusCodes', () => {
  test('is an object', (done) => {
    assert.that(statusCodes).is.ofType('object');
    done();
  });

  test('server-error-busy is 0x0507', (done) => {
    assert.that(statusCodes['server-error-busy']).is.equalTo(0x0507);
    done();
  });
});
