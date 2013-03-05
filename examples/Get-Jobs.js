var ipp = require('./../ipp');
var printer = ipp.Printer("http://cp02.local.:631/ipp/printer");

var msg = {
	"operation-attributes-tag": {
		//use these to view completed jobs...
//			"limit": 10,
//			"which-jobs": "completed"
	}
}

printer.execute("Get-Jobs", msg, function(err, res){
	console.log(res);
});
