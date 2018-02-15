'use strict';

const isReadableStream = function (stream) {
  return (stream &&
    typeof stream === 'object' &&
    typeof stream.pipe === 'function' &&
    typeof stream.read === 'function');
};

module.exports = isReadableStream;
