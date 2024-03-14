import Bitstring from "@v19/bitstring";

// prettier-ignore
const LOOKUP_TABLE = [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z", "2", "3", "4", "5", "6", "7",
];
const PADDING_CHAR = "=";
const PADDING_CHAR_REGEX = new RegExp(PADDING_CHAR, "g");

export function encode(arr: Uint8Array): string {
  const bits = new Bitstring(arr);
  const length = bits.length;
  if (length % 5 !== 0) {
    bits.rightPad(1);
  }
  const result = new Array<string>();
  for (let i = 0; i < length; i += 5) {
    const index = bits.range(i, i + 5);
    result.push(LOOKUP_TABLE[index]);
  }
  const padding = 8 - ((result.length % 8) % 8);
  for (let i = 0; i < padding; i++) {
    result.push(PADDING_CHAR);
  }
  return result.join("");
}

export function decode(str: string): Uint8Array {
  const string = str.replace(PADDING_CHAR_REGEX, "");
  const length = string.length;
  console.log("HI", string);
  const bits = new Bitstring(new Uint8Array(Math.floor((length * 5) / 8)));
  for (let i = 0; i < length; i++) {
    const index = LOOKUP_TABLE.indexOf(string[i]);
    for (let j = 0; j < 5; j++) {
      bits.set(i * 5 + j, (index >> (4 - j)) & 1);
    }
  }
  return bits.toUint8Array();
}
