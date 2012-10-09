# int53

serialization of 53-bit integers to and from 8 byte buffers.

# usage

```js
var int53 = require('int53')

var a = Buffer(8)

int53.writeUInt64BE(0xFFFFFFFFFFF, a)

var b = Buffer('0000FFFFFFFFFFFF', 'hex')

var x = int53.readUInt64BE(b)
```

## todo

* writeInt64BE
* readInt64BE
* writeUInt64LE
* readUInt64LE
* writeInt64LE
* readInt64LE