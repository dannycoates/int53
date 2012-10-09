var assert = require('assert')

var int53 = {}

var MAX_UINT32 = 0x00000000FFFFFFFF
var MAX_INT53 =  0x001FFFFFFFFFFFFF

int53.writeUInt64BE = function (number, buffer, offset) {
	assert(number > -1 && number <= MAX_INT53, "number out of range")
	assert(Math.floor(number) === number, "number must be an integer")

	offset = offset || 0
	var high = 0
	var signbit = number & 0xFFFFFFFF
	var low = signbit < 0 ? (number & 0x7FFFFFFF) + 0x80000000 : signbit
	if (number > MAX_UINT32) {
		high = Math.floor((number - low) / MAX_UINT32)
	}
	buffer.writeUInt32BE(high, offset)
	buffer.writeUInt32BE(low, offset + 4)
}

int53.readUInt64BE = function (buffer, offset) {
	offset = offset || 0
	var high = buffer.readUInt32BE(offset)
	var low = buffer.readUInt32BE(offset + 4)
	assert(high < 0x00200000, "number too large")
	return (high * (MAX_UINT32 + 1)) + low
}

module.exports = int53