'use strict';

//  To serialize and deserialize, we need to be able to look
//  things up by key or by value. This little helper just
//  converts the arrays to objects and tacks on a 'lookup' property.
const xref = (arr) => {
  const obj = {};

  arr.forEach((item, index) => {
    obj[item] = index;
  });
  obj.lookup = arr;

  return obj;
};

const extend = (destination, source) => {
  for (const property in source) {
    if (source[property] && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }

  return destination;
};

exports.extend = extend;
exports.xref = xref;
