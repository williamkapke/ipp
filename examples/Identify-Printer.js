var ipp = require('./../ipp');
var id = 0x0123;//made up reqid

var printer = ipp.Printer("http://cp02.local.:631/ipp/printer");
var msg = {
	"operation-attributes-tag": {
		"requesting-user-name": "William",
		"message": "These are not the droids you are looking for"
	}
};
printer.execute("Identify-Printer", msg, function(err, res){
	console.log(res);
});
