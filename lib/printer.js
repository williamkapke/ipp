
var r = require('./registrations'),
	request = require('./request'),
	tags = r.tags;

function id(){
	return +Math.random().toString().substr(-9);
}

function Printer(url, opts){
	opts = opts || {};
	this.version = opts.version || r.version['2.0'];
	this.uri = opts.uri || 'ipp://' + url.host;
}
Printer.prototype = {
	requestBase: function(){
		return {
			version: this.version,
			id: id||id(),
			'operation-attributes-tag': {
				'attributes-charset': 'utf-8',
				'attributes-natural-language': 'en-us',
				'printer-uri': this.uri
			}
		};
	},
	getPrinterAttributes: function(id, cb){
		this.request({
			operation:r.operation['Get-Printer-Attributes'],
			asdf:""
		}, cb);
	}
}