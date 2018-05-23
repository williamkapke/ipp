'use strict';

const assert = require('assertthat');

const parser = require('../../lib/parser');

suite('parser', () => {
  test('is a function', (done) => {
    assert.that(parser).is.ofType('function');
    done();
  });

  test('throw error if ipp message is cut before group', (done) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    const data = Buffer.from(
      '0200' + // version 2.0
      '000B' + // Get-Printer-Attributes
      '00000001', // reqid
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    assert.that(() => {
      parser(data);
    }).is.throwing('NotEnoughData');
    done();
  });

  test('throw error if ipp message is cut before group attributes', (done) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    const data = Buffer.from(
      '0200' + // version 2.0
      '000B' + // Get-Printer-Attributes
      '00000001' + // reqid
      '01', // operation-attributes-tag
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    assert.that(() => {
      parser(data);
    }).is.throwing('NotEnoughData');
    done();
  });

  test('throw error if ipp message is cut inside group attributes', (done) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    const baseData = Buffer.from(
      '0200' + // version 2.0
      '000B' + // Get-Printer-Attributes
      '00000001' + // reqid
      '01', // operation-attributes-tag
      'hex'
    );
    const attributes = Buffer.from(
      '470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650002656e',
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    /* eslint-disable no-loop-func */
    for (let l = 1; l <= attributes.length; l++) {
      assert.that(() => {
        const data = Buffer.concat([baseData, attributes.slice(0, l)]);

        parser(data);
      }).is.throwing('NotEnoughData');
    }
    /* eslint-enable no-loop-func */
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

    assert.that(parser(data)).is.equalTo({
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
