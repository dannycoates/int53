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

## why?

Sometimes you need to read and write 64-bit integers. For some
things like timestamps, file sizes, and counters the 53-bits
offered by a double is enough to get by, and easier to work with
than a bigint module.

## License

BSD