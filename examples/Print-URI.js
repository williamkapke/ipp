var ipp = require('./../ipp');
var PDFDocument = require('pdfkit');

//make a PDF document
var doc = new PDFDocument({margin:0});
doc.text(".", 0, 0);
//doc.addPage();
//doc.text(".", 0, 0);


var printer = ipp.Printer("http://cp02.local.:631/ipp/printer");
var msg = {
	"operation-attributes-tag": {
		"requesting-user-name": "William",
		"job-name": "My Test Job",
		"document-format": "application/pdf",
		"document-uri": "http://192.168.20.114:5000/check"
	}
};
printer.execute("Print-URI", msg, function(err, res){
	console.log(res);
});
