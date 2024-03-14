# @v19/base32

A simple base32 encoder/decoder for JavaScript.

## Usage

```javascript
import { encode, decode } from '@v19/base32';

const encoded = encode(new TextEncoder().encode('Hello, World!'));
console.log(encoded); // JBSWY3DPFQQFO33SNRSCC===
const decoded = new TextDecoder().decode(decode(encoded));
console.log(decoded); // Hello, World!
```
