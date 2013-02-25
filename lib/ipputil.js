

//  To serialize and deserialize, we need to be able to look
//  things up by key or by value. This little helper just
//  converts the arrays to objects and tacks on a 'lookup' property.
function xref(arr){
	var obj = {};
	arr.forEach(function(item, index){
		obj[item] = index;
	});
	obj.lookup = arr;
	return obj;
}

exports.xref = xref;

