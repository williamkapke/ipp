'use strict';

const assert = require('assertthat');

const keywords = require('../../lib/keywords');

suite('keywords', () => {
  test('is an object', (done) => {
    assert.that(keywords).is.ofType('object');
    done();
  });

  suite('printer-state-reasons', () => {
    test('is an array', (done) => {
      assert.that(keywords['printer-state-reasons']).is.ofType('array');
      done();
    });
    test('printer-state-reasons has cover-open', (done) => {
      assert.that(keywords['printer-state-reasons']).is.containing('cover-open');
      done();
    });
  });

  suite('media', () => {
    test('is an array', (done) => {
      assert.that(keywords.media).is.ofType('array');
      done();
    });
    test('media has iso-a0', (done) => {
      assert.that(keywords.media).is.containing('iso-a0');
      done();
    });
  });
});
