
var mdns = require('mdns'),
	browser  = mdns.createBrowser(mdns.tcp('ipp'));
	
mdns.Browser.defaultResolverSequence[1] = 'DNSServiceGetAddrInfo' in mdns.dns_sd ? mdns.rst.DNSServiceGetAddrInfo() : mdns.rst.getaddrinfo({families:[4]}); 

browser.on('serviceUp', function (rec) {
	console.log(rec.name, 'http://'+rec.host+':'+rec.port+'/'+rec.txtRecord.rp);
});
browser.start();

//example output...
//HP LaserJet 400 M401dn (972E51) http://CP01.local:631/ipp/printer
//HP LaserJet Professional P1102w http://P1102W.local:631/printers/Laserjet
//Officejet Pro 8500 A910 [611B21] http://HPPRINTER.local:631/ipp/printer
