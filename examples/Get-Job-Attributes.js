var ipp = require('./../ipp');
var printer = ipp.Printer("http://cp02.local.:631/ipp/printer");
var msg = {
	"operation-attributes-tag": {
		'job-uri': 'ipp://CP01.local/ipp/printer/0186'
	}
};
function go(){
	printer.execute("Get-Job-Attributes", msg, function(err, res){
		console.log(res);
		setTimeout(go, 0);
	});
}
go();