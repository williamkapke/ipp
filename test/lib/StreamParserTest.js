'use strict';

const assert = require('assertthat');
const StreamParser = require('../../lib/StreamParser');

suite('StreamParser', () => {
  test('is a function', (done) => {
    assert.that(StreamParser).is.ofType('function');
    done();
  });

  test('returns no attributes and streams no data if ipp message is incomplete', (done) => {
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

    const streamParser = new StreamParser();

    streamParser.once('attributes', () => {
      assert.that('the attributes').is.equalTo('should not be emitted');
    });
    streamParser.once('data', () => {
      assert.that('the data stream').is.equalTo('should not emit data');
    });
    streamParser.once('end', () => {
      done();
    });

    streamParser.write(data);
    streamParser.end();
  });

  test('returns error if tag is not supported', (done) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    const data = Buffer.from(
      '0200' + // version 2.0
      '000B' + // Get-Printer-Attributes
      '00000001' + // reqid
      '01' + // operation-attributes-tag
      // unsupported attribute
      '1400000000',
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    const streamParser = new StreamParser();

    streamParser.once('attributes', () => {
      assert.that('the attributes').is.equalTo('should not be emitted');
    });
    streamParser.on('data', () => {
      assert.that('the data stream').is.equalTo('should not emit data');
    });
    streamParser.once('end', () => {
      assert.that('end').is.equalTo('should not be emitted');
    });
    streamParser.once('error', (err) => {
      assert.that(err.message).is.startingWith('The spec is not clear');
      done();
    });

    streamParser.write(data);
    streamParser.end();
  });

  test('returns no data if tag is unknown', (done) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    const data = Buffer.from(
      '0200' + // version 2.0
      '000B' + // Get-Printer-Attributes
      '00000001' + // reqid
      '01' + // operation-attributes-tag
      // unknown attribute
      '1200147072696e7465722d67656f2d6c6f636174696f6e0000',
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    const streamParser = new StreamParser();
    let dataEmitted = false;

    streamParser.once('attributes', () => {
      assert.that('the attributes').is.equalTo('should not be emitted');
    });
    streamParser.on('data', () => {
      dataEmitted = true;
    });
    streamParser.once('end', () => {
      assert.that(dataEmitted).is.equalTo(false);
      done();
    });
    streamParser.once('error', (err) => {
      assert.that(err.message).is.startingWith('This should not happen.');
    });

    streamParser.write(data);
    streamParser.end();
  });

  test('returns message and data if send in one chunk', (done) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    const data = Buffer.from(
      '0200' + // version 2.0
      '000B' + // Get-Printer-Attributes
      '00000001' + // reqid
      '01' + // operation-attributes-tag
      // blah blah the required bloat of this protocol
      '470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650002656e' +
      '03' + // end-of-attributes-tag
      '54657374',
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    let attributesOk = false;
    let dataOk = false;
    const streamParser = new StreamParser();

    streamParser.once('attributes', (attributes) => {
      assert.that(attributes).is.equalTo({
        version: '2.0',
        operation: 'Get-Printer-Attributes',
        id: 1,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en'
        }
      });
      attributesOk = true;
    });
    streamParser.on('data', (chunk) => {
      assert.that(chunk.length).is.equalTo(4);
      assert.that(chunk.toString('utf8')).is.equalTo('Test');
      dataOk = true;
    });
    streamParser.once('end', () => {
      assert.that(attributesOk).is.true();
      assert.that(dataOk).is.true();
      done();
    });

    streamParser.write(data);
    streamParser.end();
  });

  test('returns message and data if send in two chunks', (done) => {
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

    let attributesOk = false;
    let dataOk = false;
    const streamParser = new StreamParser();

    streamParser.once('attributes', (attributes) => {
      assert.that(attributes).is.equalTo({
        version: '2.0',
        operation: 'Get-Printer-Attributes',
        id: 1,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en'
        }
      });
      attributesOk = true;
    });
    streamParser.on('data', (chunk) => {
      assert.that(chunk.length).is.equalTo(4);
      assert.that(chunk.toString('utf8')).is.equalTo('Test');
      dataOk = true;
    });
    streamParser.once('end', () => {
      assert.that(attributesOk).is.true();
      assert.that(dataOk).is.true();
      done();
    });

    streamParser.write(data);
    streamParser.write(Buffer.from('54657374', 'hex'));
    streamParser.end();
  });
});
