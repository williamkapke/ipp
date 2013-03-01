var ipp = require('./../ipp');
var url = require('url');
var id = 0x0123;//made up reqid
var op = ipp.operations['Get-Printer-Attributes'];

var url = url.parse("http://P1102W.local:631/printers/Laserjet");
var data = require('./../lib/message')(url.host+url.path, op, id);

ipp.request(url, data, function(err, res){
	if(err){
		return console.log(err);
	}
	console.log(JSON.stringify(res, null, 2));
});
