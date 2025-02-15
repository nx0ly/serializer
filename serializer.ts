function combineUint8Arrays(one: Uint8Array, two: Uint8Array): Uint8Array {
	const res = new Uint8Array(one.length + two.length);
	res.set(one);
	res.set(two, one.length);
    
	return res;
}

interface decodeResult {
	value: number | string;
	bytesRead: number;
}

class Serializer {
	constructor() {}

	encodeString(data: string): Uint8Array {
		const bytes = new TextEncoder().encode(data);
		const len = bytes.length;
		const pre = len <= 255 ? new Uint8Array([len]) : new Uint8Array(2);

		if (len > 255) {
			pre[0] = (len >> 8) & 0xff;
			pre[1] = len & 0xff;
		}

		return combineUint8Arrays(pre, bytes);
	}

	// TODO: add type declarations for this too.
	decodeString(data): decodeResult {
        let len: number;

        // determine if it has a 1byte or 2byte prefix
        if(data[0] <= 255) {
            len = data[0];
            return { value: new TextDecoder().decode(data.slice(1, 1 + len)), bytesRead: 1 + len };
        } else {
            len = (data[0] << 8) | data[1];
            return { value: new TextDecoder().decode(data.slice(2, 2 + len)), bytesRead: 2 + len };
        }
	}

    encodeInteger(number: number) {
        let encoded: number[] = [];

        if(number < 0x80) {
            encoded.push(number);
        } else {
            while (number > 0x7f) {
                encoded.push((number & 0x7f) | 0x80);
                number >>= 7;
            }

            encoded.push(number & 0x7f);
        }

        return new Uint8Array(encoded);
    }

	// TODO: add type declarations for this code block (i copied method from wikipedia :( )
	decodeInteger(data: Uint8Array): decodeResult {
		let result = 0;
		let shift = 0;
		let i = 0;

		for (; i < data.length; i++) {
			const byte = data[i];
			result |= (byte & 0x7f) << shift;
			if ((byte & 0x80) === 0) {
				return { value: result, bytesRead: i + 1 };
			}
			shift += 7;
		}

		throw new Error("invalid data passed to decode integer, serializer");
	}

	encode(data: string | number | []): Uint8Array {
		let type: number;
		let res: Uint8Array;

		if (typeof data === "number") {
			type = 0x01;
            res = this.encodeInteger(data);
		} else if (typeof data === "string") {
			type = 0x02;
            res = this.encodeString(data);
		} else throw new Error("unsupported data type passed to serializer");

        if(res == null) console.log("encoding returned null, serializer");
        
		return combineUint8Arrays(new Uint8Array([type]), res);
	}

	decode(data): decodeResult {
		const type = data[0];
		let res: decodeResult;

		if (type === 0x01) {
			//* integer
			res = this.decodeInteger(data.slice(1));
			return { value: res.value, bytesRead: res.bytesRead + 1 };
		}

		if (type === 0x02) {
			//* string
			res = this.decodeString(data.slice(1));
			return { value: res.value, bytesRead: res.bytesRead + 1 };
		}

		throw new Error("unknown type in decode serializer");
	}
}

const serializer = new Serializer();
export default serializer;