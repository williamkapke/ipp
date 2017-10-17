var ipp = require('./../ipp');
var PDFDocument = require('pdfkit');
var concat = require("concat-stream");

var doc = new PDFDocument({margin:0});
doc.text(".", 0, 0);


doc.pipe(concat(function (data) {
	var printer = ipp.Printer("http://cp02.local.:631/ipp/printer");
	var msg = {
		"operation-attributes-tag": {
			"requesting-user-name": "Bumblebee",
			"job-name": "whatever.pdf",
			"document-format": "application/pdf"
		},
		"job-attributes-tag":{
      "media-col": {
        "media-source": "tray-2"
      }
		}
		, data: data
	};
	printer.execute("Print-Job", msg, function(err, res){
		console.log(err);
		console.log(res);
	});
}));
doc.end();
