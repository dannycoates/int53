var assert = require('assert')
var int53 = require('./index')

function testUInt64BE(x) {
	var b = new Buffer(8)
	int53.writeUInt64BE(x, b)
	assert(x === int53.readUInt64BE(b))
}

function testInt64BE(x) {
	var b = new Buffer(8)
	int53.writeInt64BE(x, b)
	assert(x === int53.readInt64BE(b))
}

function error(func, number, message) {
	try {
		func(number)
		assert(false)
	}
	catch (e) {
		assert(e.message === message, e.message)
	}
}

testUInt64BE(0)
testUInt64BE(1)
testUInt64BE(0xFFFFFFFF - 2)
testUInt64BE(0xFFFFFFFF - 1)
testUInt64BE(0xFFFFFFFF)
testUInt64BE(0xFFFFFFFF + 1)
testUInt64BE(0xFFFFFFFF + 2)
testUInt64BE(0xFFFFFFFFFFFFF)
testUInt64BE(0x1FFFFFFFFFFFFF)
error(testUInt64BE, 0x1FFFFFFFFFFFFF + 1, 'number out of range')
error(testUInt64BE, -1, 'number out of range')
error(testUInt64BE, 1.1, 'number must be an integer')

try {
	var b = new Buffer('FFFFFFFFFFFFFFFF', 'hex')
	var x = int53.readUInt64BE(b)
	assert(false)
}
catch (e) {
	assert(e.message === 'number too large', e.message)
}

testInt64BE(-2147483648)
testInt64BE(-1)
testInt64BE(1)
testInt64BE(-64424509440)
testInt64BE(-4294967297)
testInt64BE(-4294967296)
testInt64BE(-4294967295)
testInt64BE(-9007199254740991)
error(testInt64BE, -9007199254740992, 'number out of range')
error(testInt64BE, -1.1, 'number must be an integer')

try {
	var b = new Buffer('FFDFFFFFFFFFFFFF', 'hex')
	var x = int53.readInt64BE(b)
	assert(false)
}
catch (e) {
	assert(e.message === 'number too small', e.message)
}

console.log("SUCCESS!")
