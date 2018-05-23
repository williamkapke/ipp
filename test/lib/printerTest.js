'use strict';

const assert = require('assertthat');

const printer = require('../../lib/printer');

suite('printer', () => {
  test('is a function', (done) => {
    assert.that(printer).is.ofType('function');
    done();
  });

  test('printer.execute is a function', (done) => {
    const uri = 'ipp://localhost:6631/ipp/print/foo';
    const ippPrinter = printer(uri);

    assert.that(ippPrinter.execute).is.ofType('function');
    done();
  });
});
