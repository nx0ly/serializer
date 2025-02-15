"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var msgpack = require("msgpack-lite");
var serializer_1 = require("./serializer");
// encode speed test
var msgpackstart = performance.now();
for (var i = 0; i < 1000000; i++) {
    msgpack.encode("mashallah");
}
console.log("msgpack-lite encode speed ".concat((performance.now() - msgpackstart), "ms"));
var mystart = performance.now();
for (var i = 0; i < 1000000; i++) {
    serializer_1.default.encode("mashallah");
}
console.log("my encode speed ".concat((performance.now() - mystart), "ms"));
// size test
console.log("msgpack-lite encode size ".concat(msgpack.encode("mashallah").length, " bytes"));
console.log("my encode size ".concat(serializer_1.default.encode("mashallah").length, " bytes"));
var mss = msgpack.encode("mashallah");
var myy = serializer_1.default.encode("mashallah");
// decode speed test
var msgpackstartd = performance.now();
for (var i = 0; i < 1000000; i++) {
    msgpack.decode(mss);
}
console.log("msgpack-lite decode speed ".concat((performance.now() - msgpackstartd), "ms"));
var mystartd = performance.now();
for (var i = 0; i < 1000000; i++) {
    serializer_1.default.decode(myy);
}
console.log("my decode speed ".concat((performance.now() - mystartd), "ms"));
