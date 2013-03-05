var ipp = require('./../ipp');
var PDFDocument = require('pdfkit');

//make a PDF document
var doc = new PDFDocument({margin:0});
doc.text(".", 0, 0);
//doc.addPage();
//doc.text(".", 0, 0);


doc.output(function(pdf){
	var printer = ipp.Printer("http://cp02.local.:631/ipp/printer");
	var msg = {
		"operation-attributes-tag": {
			"requesting-user-name": "William",
			"job-name": "My Test Job",
			"document-format": "application/pdf"
		},
		"job-attributes-tag":{
//			"copies": 2,
//			"sides":"two-sided-long-edge",
			"media-col": {
				"media-source": "tray-2"
			}
		}
		, data: new Buffer(pdf, 'binary')
	};
	printer.execute("Print-Job", msg, function(err, res){
		console.log(res);
	});
});
