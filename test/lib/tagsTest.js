'use strict';

const assert = require('assertthat');

const tags = require('../../lib/tags');

suite('tags', () => {
  test('is an object', (done) => {
    assert.that(tags).is.ofType('object');
    done();
  });

  test('job-attributes-tag is 0x02', (done) => {
    assert.that(tags['job-attributes-tag']).is.equalTo(0x02);
    done();
  });

  test('integer is 0x21', (done) => {
    assert.that(tags.integer).is.equalTo(0x21);
    done();
  });

  test('uri is 0x45', (done) => {
    assert.that(tags.uri).is.equalTo(0x45);
    done();
  });

  test('memberAttrName is 0x4a', (done) => {
    assert.that(tags.memberAttrName).is.equalTo(0x4a);
    done();
  });
});
