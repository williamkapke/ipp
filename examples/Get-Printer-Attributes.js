var ipp = require('./../ipp');
var id = 0x0123;//made up reqid

var printer = ipp.Printer("http://cp02.local.:631/ipp/printer");
printer.execute("Get-Printer-Attributes", null, function(err, res){
	console.log(res);
});
