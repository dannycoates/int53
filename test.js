var assert = require('assert')
var int53 = require('./index')

function testUInt64(x) {
	var b = new Buffer(8)
	int53.writeUInt64BE(x, b)
	assert(x === int53.readUInt64BE(b))

	int53.writeUInt64LE(x, b)
	assert(x === int53.readUInt64LE(b))
}

function testInt64(x) {
	var b = new Buffer(8)
	int53.writeInt64BE(x, b)
	assert(x === int53.readInt64BE(b))

	int53.writeInt64LE(x, b)
	assert(x === int53.readInt64LE(b))
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

testUInt64(0)
testUInt64(1)
testUInt64(0xFFFFFFFF - 2)
testUInt64(0xFFFFFFFF - 1)
testUInt64(0xFFFFFFFF)
testUInt64(0xFFFFFFFF + 1)
testUInt64(0xFFFFFFFF + 2)
testUInt64(0xFFFFFFFFFFFFF)
testUInt64(0x1FFFFFFFFFFFFF)
error(testUInt64, 0x1FFFFFFFFFFFFF + 1, 'number out of range')
error(testUInt64, -1, 'number out of range')
error(testUInt64, 1.1, 'number must be an integer')

try {
	var b = new Buffer('FFFFFFFFFFFFFFFF', 'hex')
	var x = int53.readUInt64BE(b)
	assert(false)
}
catch (e) {
	assert(e.message === 'number too large', e.message)
}

testInt64(-2147483648)
testInt64(-1)
testInt64(1)
testInt64(-64424509440)
testInt64(-4294967297)
testInt64(-4294967296)
testInt64(-4294967295)
testInt64(-9007199254740991)
error(testInt64, -9007199254740992, 'number out of range')
error(testInt64, -1.1, 'number must be an integer')

try {
	var b = new Buffer('FFDFFFFFFFFFFFFF', 'hex')
	var x = int53.readInt64BE(b)
	assert(false)
}
catch (e) {
	assert(e.message === 'number too small', e.message)
}

console.log("SUCCESS!")
