
var operations = require('./operations'),
	tags = require('./tags'),
	versions = require('./versions'),
	attributes = require('./attributes'),
	statusCodes = require('./status-codes')
;
function random(){
	return +Math.random().toString().substr(-8);
}

module.exports = function serializer(msg){
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
	function write(str, enc){
		var length = Buffer.byteLength(str);
		write2(length);
		buf.write(str, position, length, enc || "utf8");
		position+=length;
	}
	var special = {'attributes-charset':1, 'attributes-natural-language':2};
	var groupmap = {
		"job-attributes-tag":				'Job Description',
		'operation-attributes-tag':			'Operation',
		'printer-attributes-tag':			'Printer Description',
		"unsupported-attributes-tag":		'',
		"subscription-attributes-tag":		'Subscription Description',
		"event-notification-attributes-tag": 'Event Notifications',
		"resource-attributes-tag":			'',
		"document-attributes-tag":			'Document Description'
	};
	function writeGroup(tag){
		var attrs = msg[tag];
		if(!attrs) return;
		var keys = Object.keys(attrs).sort(function(a,b){ return (special[a]||3)-(special[b]||3); });
		var groupname = groupmap[tag];
		write1(tags[tag]);
		keys.forEach(function(name){
			attr(groupname, name, attrs);
		});
	}
	function attr(group, name, obj){
		debugger;
		var syntax = attributes[group][name];
		if(!syntax) throw "Unknown attribute: " + name;

		write1(syntax.tag);
		write(name);

		var value = obj[name];
		if(!Array.isArray(value))
			value = [value];

		value.forEach(function(value, i){
			if(i) write2(0x0000);//empty name
			if(syntax.tag===tags.enum)
				value = enums[name][value];
			writeValue(syntax, value);
		});
	}
	function writeValue(syntax, value){
		switch(syntax.tag){
			case tags.enum:
				return write4(value);
			case tags.integer:
				return write4(value);

			case tags.boolean:
				return write1(!!value);

			case tags.rangeOfInteger:
				write4(value[0]);
				write4(value[1]);
				return;

			case tags.resolution:
				write4(value[0]);
				write4(value[1]);
				write1(value[2]==='dpi'? 0x03 : 0x04);
				return;

			case tags.dateTime:
				write2(value.getFullYear());
				write1(value.getMonth());
				write1(value.getDate());
				write1(value.getHours());
				write1(value.getMinutes());
				write1(value.getSeconds());
				write1(value.getMilliseconds());
				var tz = timezone(value);
				read1(tz[0]);// + or -
				read1(tz[1]);//hours
				read1(tz[2]);//minutes

			case tags.textWithLanguage:
			case tags.nameWithLanguage:
				throw "No language support yet. Pull req encouraged!";
				return;

			case tags.nameWithoutLanguage:
			case tags.textWithoutLanguage:
			case tags.octetString:
			case tags.memberAttrName:
				return write(value);

			case tags.keyword:
			case tags.uri:
			case tags.uriScheme:
			case tags.charset:
			case tags.naturalLanguage:
			case tags.mimeMediaType:
				return write(value, 'ascii');

			case tags.begCollection:
				write2(0);//empty value
				return writeCollection(syntax, value);

			default:
				debugger;
				console.log(tag, "not handled");
		}
	}
	function writeCollection(syntax, value){
		Object.keys(value).forEach(function(key){
			var subvalue = value[key];
			var subsyntax = syntax.members[key];
			if(syntax.tag===tags.enum)
				subvalue = enums[key][subvalue];
			write2(0)//empty name
			writeValue(subsyntax, subvalue)
		});
	}

	write2(versions[msg.version||'2.0']);
	write2(msg.operation? operations[msg.operation] : statusCodes[msg.statusCode]);
	write4(msg.id||random());//request-id

	writeGroup('operation-attributes-tag');
	writeGroup('printer-attributes-tag');
	//TODO... add the others

	write1(0x03);//end
	
	
	if(!msg.data)
		return buf.slice(0, position);

	var buf2 = new Buffer(Buffer.byteLength(msg.data) + position);
	buf.copy(buf2);
	buf2.write(msg.data, position);
	return buf2;
};
function timezone(d) {
	var z = d.getTimezoneOffset();
	return [
		z > 0 ? "-" : "+",
		~~(Math.abs(z) / 60),
		Math.abs(z) % 60
	];
}
