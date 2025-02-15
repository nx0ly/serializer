const msgpack = require("msgpack-lite");
import serializer from "./serializer";

// encode speed test
const msgpackstart = performance.now();
for(let i = 0; i < 1000000; i++) {
    msgpack.encode("mashallah");
}
console.log(`msgpack-lite encode speed ${(performance.now() - msgpackstart)}ms`);

const mystart = performance.now();
for(let i = 0; i < 1000000; i++) {
    serializer.encode("mashallah");
}
console.log(`my encode speed ${(performance.now() - mystart)}ms`);

// size test
console.log(`msgpack-lite encode size ${msgpack.encode("mashallah").length} bytes`);

console.log(`my encode size ${serializer.encode("mashallah").length} bytes`);

const mss = msgpack.encode("mashallah");
const myy = serializer.encode("mashallah");

// decode speed test
const msgpackstartd = performance.now();
for(let i = 0; i < 1000000; i++) {
    msgpack.decode(mss);
}
console.log(`msgpack-lite decode speed ${(performance.now() - msgpackstartd)}ms`);

const mystartd = performance.now();
for(let i = 0; i < 1000000; i++) {
    serializer.decode(myy);
}
console.log(`my decode speed ${(performance.now() - mystartd)}ms`);
