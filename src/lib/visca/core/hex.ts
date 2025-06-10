/**
 * /core/hex.ts
 * 
 * Being that HEX is an integral piece for communicating via PTZ
 * this file contains shared functions that aim to make manipulating
 * hex a little easier.
 */

export function hexToBuffer(decimalNumber: number) {
  const hexString = parseInt(`${decimalNumber}`)
    .toString(16)
    .padStart(4, '0');

  const hexChars = Array.from(hexString);

  const packet = hexChars.reduce((acc, val) => {
    return `${acc}0${val}`;
  }, "");

  return Buffer.from(packet, "hex");
}

export function bufferToHex(buffer: Buffer) {
	const chars = Array.from(buffer.toString("hex"));
	return chars.reduce((acc, val, index) => {
		return index % 2 ? `${acc}${val}` : `${acc}`;
	}, "0x");
}
