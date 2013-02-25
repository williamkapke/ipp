# Internet Printing Protocol (IPP) for nodejs
---

This is a very indepth protocol that spans many RFCs- some of which are dead while others were herded into IPP/v2.x. It 
will take a while to build this lib and definately needs community help.

I have a pretty good starting point here. I created reference files 
(<del>`attributes`</del>, `enums`, `keywords`, `operations`, `status-codes`, `versions` and `tags`) and tried to include as many 
links in the comments to the ref docs as I could.

IPP uses a confusing/complicated/custom binary serialization IMHO that dates back to the lates '90s. After 15 years of 
building this protocol- I the technologies available today could simplified things 10X (again IMO). But it is what is 
deployed on millions of printers now- so we'll work with it.

### Install
```bash
$ npm install ipp
```


## ipp.parse(buffer)

My first goal was to create a parser...

```javascript
var ipp = require('ipp');
var data = new Buffer(
    '0200' +	//version 2.0
		'000B' +	//Get-Printer-Attributes
		'00000001'+	//reqid
		'01' +		//operation-attributes-tag
		//blah blah the required bloat of this protocol
		'470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650002656e' +
		'03'		//end-of-attributes-tag
	,'hex');


var result = ipp.parse(data);
console.log(JSON.stringify(result,null,2));
//  ta-da!
//{
//	"version": "2.0",
//	"operation": 11,
//	"id": 1,
//	"operation-attributes-tag": {
//		"attributes-charset": "utf-8",
//		"attributes-natural-language": "en"
//	}
//}
```

## ipp.request(url, data, callback)

This is a work-in-progress but it is working enough for ya'll to reference.

```javascript
var ipp = require('ipp');
var id = 0x0123;//made up reqid
var op = ipp.operations['Get-Printer-Attributes'];

//This is a experimental module.
//Expect it to be changed.
//Don't expect it to do what you want.
var data = require('./lib/message')("your-printer", op, id);

ipp.request("ipp://your-printer/", data, function(err, res){
	if(err){
		return console.log(err);
	}
	console.log(JSON.stringify(res,null,2));
})
//  ta-da!.. hopefully you'll see a ton of stuff from your printer
```

## License

MIT
