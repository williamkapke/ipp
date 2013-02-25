
var versions = [];
versions[0x0100] = '1.0';
versions[0x0101] = '1.1';
versions[0x0200] = '2.0';
versions[0x0201] = '2.1';

module.exports = require('./ipputil').xref(versions);
