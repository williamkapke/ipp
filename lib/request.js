
var http = require('http'),
	https = require('https'),
	url = require('url'),
	parse = require('./parser');

module.exports = function(opts, buffer, cb){
	var streamed = typeof buffer === "function";
	//All IPP requires are POSTs- so we must have some data.
	//  10 is just a number I picked- this probably should have something more meaningful
	if(!Buffer.isBuffer(buffer) || buffer.length<10){
		return cb(new Error("Data required"));
	}
	if(typeof opts === "string")
		opts = url.parse(opts);
	if(!opts.port) opts.port = 631;

	if(!opts.headers) opts.headers = {};
	opts.headers['Content-Type'] = 'application/ipp';
	opts.method = "POST";
	
	if(opts.protocol==="ipp:")
		opts.protocol="http:";

	if(opts.protocol==="ipps:")
		opts.protocol="https:";

	var req = (opts.protocol==="https:" ? https : http).request(opts, function(res){
//		console.log('STATUS: ' + res.statusCode);
//		console.log('HEADERS: ' + JSON.stringify(res.headers));
		switch(res.statusCode){
			case 100:
				if(opts.headers['Expect'] !== '100-Continue' || typeof opts.continue !== "function"){
					cb(new IppResponseError(res.statusCode));
				}
				return console.log("100 Continue");
			case 200:
				return readResponse(res, cb);
			default:
				cb(new IppResponseError(res.statusCode));
				return console.log(res.statusCode, "response");
		}
	});
	req.on('error', function(err) {
		cb(err);
	});
	if(opts.headers['Expect'] === '100-Continue' && typeof opts.continue=== "function"){
		req.on('continue', function() {
			opts.continue(req);
		});
	}
	req.write(buffer);
	req.end();
};
function readResponse(res, cb){
	var chunks = [],length=0;
	res.on('data', function(chunk){
		length+=chunk.length;
		chunks.push(chunk);
	});
	res.on('end', function(){
		var response = parse(Buffer.concat(chunks, length));
		delete response.operation;
		cb(null, response);
	});
}

function IppResponseError(statusCode, message) {
  this.name = 'IppResponseError';
  this.statusCode = statusCode;
  this.message = message || 'Received unexpected response status ' + statusCode + ' from the printer';
  this.stack = (new Error()).stack;
}
IppResponseError.prototype = Object.create(Error.prototype);
IppResponseError.prototype.constructor = IppResponseError;
