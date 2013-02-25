

var tag = require('./tags');


function msg(host, operation, id){
	var buf = new Buffer(1024);
	var position = 0;
	function write1(val){
		buf.writeUInt8(val, position);
		position+=1;
	}
	function write2(val){
		buf.writeUInt16BE(val, position);
		position+=2;
	}
	function write4(val){
		buf.writeUInt32BE(val, position);
		position+=4;
	}
	function write(str){
		var length = Buffer.byteLength(str);
		write2(length);
		buf.write(str, position, length);
		position+=length;
	}
	function attr(tag, name, values){
		write1(tag);
		write(name);
		for(var i=0;i<values.length;i++){
			write(values[i]);
		}
	}
	//http://tools.ietf.org/html/rfc2910#section-3.1.1
	//	-----------------------------------------------
	//	|                  version-number             |   2 bytes  - required
	//	-----------------------------------------------
	//	|               operation-id (request)        |
	//	|                      or                     |   2 bytes  - required
	//	|               status-code (response)        |
	//	-----------------------------------------------
	//	|                   request-id                |   4 bytes  - required
	//	-----------------------------------------------
	//	|                 attribute-group             |   n bytes - 0 or more
	//	-----------------------------------------------
	//	|              end-of-attributes-tag          |   1 byte   - required
	//	-----------------------------------------------
	//	|                     data                    |   q bytes  - optional
	//	-----------------------------------------------

	write2(0x0200);//version 2.0
	write2(operation);
	write4(id);//request-id

	//the required stuff...
	write1(tag['operation-attributes-tag']);//0x01
	attr(tag.charset, 'attributes-charset', ['utf-8']);
	attr(tag.naturalLanguage, 'attributes-natural-language', ['en-us']);
	attr(tag.uri, 'printer-uri', ['ipp://'+host]);

	write1(0x03);//end
	return buf.slice(0, position);
}

module.exports = msg;