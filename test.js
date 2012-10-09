var assert = require('assert')
var int53 = require('./index')

function test(x) {
	var b = new Buffer(8)
	int53.writeUInt64BE(x, b)
	assert(x === int53.readUInt64BE(b))
}

test(0)
test(1)
test(0xFFFFFFFF - 2)
test(0xFFFFFFFF - 1)
test(0xFFFFFFFF)
test(0xFFFFFFFF + 1)
test(0xFFFFFFFF + 2)
test(0xFFFFFFFFFFFFF)
test(0x1FFFFFFFFFFFFF)

try {
	test(0x1FFFFFFFFFFFFF + 1)
	assert(false)
}
catch (e) {
	assert(e.message === 'number out of range')
}

try {
	test(-1)
	assert(false)
}
catch (e) {
	assert(e.message === 'number out of range')
}

try {
	test(1.1)
	assert(false)
}
catch (e) {
	assert(e.message === 'number must be an integer')
}
