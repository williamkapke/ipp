'use strict';

const assert = require('assertthat');

const enums = require('../../lib/enums');

suite('enums', () => {
  test('is an object', (done) => {
    assert.that(enums).is.ofType('object');
    done();
  });

  suite('document-state', () => {
    test('is an object', (done) => {
      assert.that(enums['document-state']).is.ofType('object');
      done();
    });
    test('completed is 0x09', (done) => {
      assert.that(enums['document-state'].completed).is.equalTo(0x09);
      done();
    });
  });

  suite('finishings', () => {
    test('is an object', (done) => {
      assert.that(enums.finishings).is.ofType('object');
      done();
    });
    test('trim-after-job is 0x3f', (done) => {
      assert.that(enums.finishings['trim-after-job']).is.equalTo(0x3f);
      done();
    });
  });

  suite('operations-supported', () => {
    test('is an object', (done) => {
      assert.that(enums['operations-supported']).is.ofType('object');
      done();
    });
    test('Validate-Document is 0x3d', (done) => {
      assert.that(enums['operations-supported']['Validate-Document']).is.equalTo(0x3d);
      done();
    });
    test('Startup-All-Printers is 0x64', (done) => {
      assert.that(enums['operations-supported']['Startup-All-Printers']).is.equalTo(0x64);
      done();
    });
    test('CUPS-Get-Default is undefined', (done) => {
      assert.that(enums['operations-supported']['CUPS-Get-Default']).is.undefined();
      done();
    });
    test('lookup returns undefined for operation greater 0x64', (done) => {
      assert.that(enums['operations-supported'].lookup[0x4001]).is.undefined();
      done();
    });
  });

  suite('cups-operations-supported', () => {
    test('is an object', (done) => {
      assert.that(enums['cups-operations-supported']).is.ofType('object');
      done();
    });
    test('CUPS-Get-Default is 0x4001', (done) => {
      assert.that(enums['cups-operations-supported']['CUPS-Get-Default']).is.equalTo(0x4001);
      done();
    });
    test('CUPS-Get-Printers is 0x4002', (done) => {
      assert.that(enums['cups-operations-supported']['CUPS-Get-Printers']).is.equalTo(0x4002);
      done();
    });
    test('CUPS-Move-Job is 0x400d', (done) => {
      assert.that(enums['cups-operations-supported']['CUPS-Move-Job']).is.equalTo(0x400d);
      done();
    });
    test('CUPS-Create-Local-Printer is 0x4028', (done) => {
      assert.that(enums['cups-operations-supported']['CUPS-Create-Local-Printer']).is.equalTo(0x4028);
      done();
    });
  });

  suite('job-collation-type', () => {
    test('is an object', (done) => {
      assert.that(enums['job-collation-type']).is.ofType('object');
      done();
    });
    test('uncollated-documents is 0x05', (done) => {
      assert.that(enums['job-collation-type']['uncollated-documents']).is.equalTo(0x05);
      done();
    });
  });

  suite('job-state', () => {
    test('is an object', (done) => {
      assert.that(enums['job-state']).is.ofType('object');
      done();
    });
    test('completed is 0x09', (done) => {
      assert.that(enums['job-state'].completed).is.equalTo(0x09);
      done();
    });
  });

  suite('orientation-requested', () => {
    test('is an object', (done) => {
      assert.that(enums['orientation-requested']).is.ofType('object');
      done();
    });
    test('none is 0x07', (done) => {
      assert.that(enums['orientation-requested'].none).is.equalTo(0x07);
      done();
    });
  });

  suite('print-quality', () => {
    test('is an object', (done) => {
      assert.that(enums['print-quality']).is.ofType('object');
      done();
    });
    test('high is 0x05', (done) => {
      assert.that(enums['print-quality'].high).is.equalTo(0x05);
      done();
    });
  });

  suite('printer-state', () => {
    test('is an object', (done) => {
      assert.that(enums['printer-state']).is.ofType('object');
      done();
    });
    test('stopped is 0x05', (done) => {
      assert.that(enums['printer-state'].stopped).is.equalTo(0x05);
      done();
    });
  });
});
