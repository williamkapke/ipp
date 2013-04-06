var ipp = require('ipp'); //get it from there - https://npmjs.org/package/ipp - $npm install ipp
var fs = require('fs');
// Get printers from here - http://localhost:631/printers
// we need real printer url to use there
//for example, i have printer Xerox Phaser 3010 on my local pc. it is accessible from this url in CUPS
var printer = ipp.Printer("http://localhost:631/printers/Xerox-Phaser-3010");


function doNapPrint(bufferToBePrinted, callback) {
    printer.execute("Print-Job",
        {
            "operation-attributes-tag":{
                "requesting-user-name":"nap",
                "job-name":"testing"
            },
            "job-attributes-tag":{},
            data:bufferToBePrinted
        },
        function (err, res) {
            if (res.statusCode == 'successful-ok') {
                var jobUri = res['job-attributes-tag']['job-uri'];
                var tries = 0;
                var t = setInterval(function () {
                    printer.execute("Get-Job-Attributes",
                        {"operation-attributes-tag":{'job-uri':jobUri}},
                        function (err2, job) {
                            if (err2) throw err2;
                            tries++;
                            if (job["job-attributes-tag"]["job-state"] == 'completed') {
                                clearInterval(t);
                                callback(null, job);
                            }
                            if (tries > 100) {//todo - change it to what you need!
                                clearInterval(t);
                                callback(new Error('Job is canceled - too many tries and job is not printed!'), null);
                            }
                        });

                }, 2000);
            } else {
                callback(new Error('Error sending job to printer!'), null);
            }
        });
}

/*
 Example of usage
 */

fs.readFile('PrintWithCallback.js', function (err, data) {
    var b = new Buffer(data, 'binary');
    doNapPrint(b,
        function (err, job) {
            if (err) {
                console.error('Error printing');
                console.error(err);
            } else {
                console.log('Printed. Job parameters are: ');
                console.log(job);
            }
        }
    );
});
