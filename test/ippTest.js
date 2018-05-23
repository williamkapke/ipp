'use strict';

const assert = require('assertthat');

const ipp = require('../ipp.js');

suite('ipp', () => {
  test('is an object', (done) => {
    assert.that(ipp).is.ofType('object');
    done();
  });

  suite('ipp.parse()', () => {
    test('is a function', (done) => {
      assert.that(ipp.parse).is.ofType('function');
      done();
    });

    test('can parse Get-Printer-Attributes', (done) => {
      /* eslint-disable line-comment-position */
      /* eslint-disable no-inline-comments */
      const data = Buffer.from(
        '0200' + // version 2.0
        '000B' + // Get-Printer-Attributes
        '00000001' + // reqid
        '01' + // operation-attributes-tag
          // blah blah the required bloat of this protocol
          '470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650002656e' +
          '03', // end-of-attributes-tag
        'hex'
      );
      /* eslint-enable line-comment-position */
      /* eslint-enable no-inline-comments */

      assert.that(ipp.parse(data)).is.equalTo({
        version: '2.0',
        operation: 'Get-Printer-Attributes',
        id: 1,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en'
        }
      });
      done();
    });
  });

  suite('ipp.StreamParser', () => {
    test('is a function', (done) => {
      assert.that(ipp.StreamParser).is.ofType('function');
      done();
    });
  });
});
