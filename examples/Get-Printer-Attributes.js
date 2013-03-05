var ipp = require('./../ipp');
var id = 0x0123;//made up reqid

var printer = ipp.Printer("http://NPI977E4E.local.:631/ipp/printer");
var msg = {
	"operation-attributes-tag": {
		"requesting-user-name": "William",
		"job-name": "My Test Job",
		"document-format": "application/pdf"
		, "message": "This is a test"
	}
};
printer.execute("Identify-Printer", msg, function(err, res){
	console.log(res);
});
