# SSR

A highly efficient serializer designed to handle short strings and integers with minimal overhead. This serializer is optimized for speed and compact encoding.

## Features

- **Super fast encoding and decoding**: Achieves superior performance for short strings and integer values.
- **Efficient data size**: Slightly larger than the MsgPack format but with notable performance improvements.
- **Lightweight**: Works seamlessly for small data structures like short strings and integers.

## Performance Comparison

Below are performance benchmarks comparing `msgpack-lite` and `SSR` encoding/decoding for both speed and size:

| Format              | Operation             | Speed (ms)     | Size (bytes) |
|---------------------|-----------------------|----------------|--------------|
| `msgpack-lite`       | Encode                | 1066.71        | 10           |
| `SSR`                | Encode                | 768.22         | 11           |
| `msgpack-lite`       | Decode                | 327.86         | N/A          |
| `SSR`                | Decode                | 318.04         | N/A          |

### Key Insights:
- **Encoding Speed**: `SSR` outperforms `msgpack-lite` by about 28%, making it the fastest option for small data.
- **Encoding Size**: The size difference is minimal (1 byte), with `msgpack-lite` being slightly more compact.
- **Decoding Speed**: `SSR` is just slightly slower than `msgpack-lite` but still provides a substantial speed advantage.

## Installation

To install and use SSR in your project:

1. Clone the repository:
   ```bash
   git clone https://github.com/d1skidder/SSR.git
   ```
2. Import the repository library:
   ```js
   const SSR = require('serializer.js');

   const encodedData = mySerializer.encode('Hello, World!');
   const decodedData = mySerializer.decode(encodedData);
   ```
Open issues in the Github Repo if any arise.

