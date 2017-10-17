var ipp = require('./../ipp');
var printer = ipp.Printer("ipp://cp02.local.:631/ipp/printer");

var msg = {
  "operation-attributes-tag": {
   //use these to view completed jobs...
//	"limit": 10,
   "which-jobs": "completed",

    "requested-attributes": [
      "job-id",
      "job-uri",
      "job-state",
      "job-state-reasons",
      "job-name",
      "job-originating-user-name",
      "job-media-sheets-completed"
    ]
  }
}

printer.execute("Get-Jobs", msg, function(err, res){
  if (err) return console.log(err);
  console.log(res['job-attributes-tag']);
});
