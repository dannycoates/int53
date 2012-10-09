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
	assert((high & 0xFFE00000) === 0, "number too large")
	return (high * (MAX_UINT32 + 1)) + low
}

int53.readInt64BE = function (buffer, offset) {
	offset = offset || 0
	var high = buffer.readUInt32BE(offset)
	var low = buffer.readUInt32BE(offset + 4)
	if ((high & 0x80000000) !== 0) {
		//negative. 2's compliment shenanigans
		high = ~high
		low = ~low
		if (low < 0) {
			low = (low & 0x7FFFFFFF) + 0x80000000
		}
		assert((high & 0xFFE00000) === 0, "number too small")
		return -((high * (MAX_UINT32 + 1)) + low + 1)
	}
	else {
		//positive
		assert((high & 0xFFE00000) === 0, "number too large")
		return (high * (MAX_UINT32 + 1)) + low
	}
}

int53.writeInt64BE = function (number, buffer, offset) {
	offset = offset || 0
	if (number > -1) {
		int53.writeUInt64BE(number, buffer, offset)
	}
	else {
		assert(Math.ceil(number) === number, "number must be an integer")
		var pos = -number
		assert(pos <= MAX_INT53, "number out of range")
		var high = 0
		var signbit = pos & 0xFFFFFFFF
		var low = signbit < 0 ? (pos & 0x7FFFFFFF) + 0x80000000 : signbit
		if (pos > MAX_UINT32) {
			high = Math.floor((pos - low) / MAX_UINT32)
		}
		high = ~high
		low = ~(pos & 0xFFFFFFFF)
		if (low === -1) {
			high += 1
			low = 0
		}
		else {
			low += 1
		}
		buffer.writeUInt32BE(high, offset, true)
		buffer.writeUInt32BE(low, offset + 4, true)
	}
}

module.exports = int53
