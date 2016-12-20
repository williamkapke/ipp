

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

exports.extend  = function extend(destination, source) {
	for(var property in source) {
		if (source[property] && (typeof source[property] === 'object' && !(source[property] instanceof Buffer))) {
			destination[property] = destination[property] || {};
			extend(destination[property], source[property]);
		}
		else {
			destination[property] = source[property];
		}
	}
	return destination;
};
