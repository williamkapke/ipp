
var request = require('./request'),
	serialize = require('./serializer'),
	extend = require('./ipputil').extend,
	parseurl = require('url').parse
	;

function Printer(url, opts){
	if(!(this instanceof Printer)) return new Printer(url, opts);
	opts = opts || {};
	this.url = typeof url==="string"? parseurl(url) : url;
	this.version = opts.version || '2.0';
	this.uri = opts.uri || 'ipp://' + url.host + url.path;
	this.charset = opts.charset || 'utf-8';
	this.language = opts.language || 'en-us';
}
Printer.prototype = {
	_message: function(operation, msg){
		if(typeof operation === "undefined") operation = 'Get-Printer-Attributes';
		return extend({
			version: this.version,
			operation: operation,
			id: null,//will get added by serializer if one isn't given
			'operation-attributes-tag': {
				'attributes-charset': this.charset,
				'attributes-natural-language': this.language,
				'printer-uri': this.uri
			}
		}, msg);
	},
	execute: function(operation, msg, cb){
		var msg = this._message(operation, msg);
//		console.log(JSON.stringify(msg, null, 2));
		var buf = serialize(msg);
//		console.log(buf);
//		console.log(require('./parser')(buf));
		request(this.url, buf, cb);
	}
}

module.exports = Printer;

