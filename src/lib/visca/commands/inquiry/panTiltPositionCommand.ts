import { ViscaInquiryCommand } from "../abstractCommand";
import { bufferToHex } from '../../core/hex';

function convertNumberToPosition(n: number) {
	const max = 65535;
	const mid = 32768;
	return n < mid ? n : n - max;
}

export class PanTiltPositionCommand extends ViscaInquiryCommand {
	serialize() {
		return Buffer.from([0x81, 0x09, 0x06, 0x12, 0xff]);
	}

	deserialize(payload: Buffer): any {
		// PAN: MIN/MAX = -2978/372
		// TILT: MIN/MAX = -1880/2216

		const panPayload = payload.slice(2, 6);
		const panHex = bufferToHex(panPayload);
		const panPosition = convertNumberToPosition(parseInt(panHex));

		const tiltPayload = payload.slice(6, 10);
		const tiltHex = bufferToHex(tiltPayload);
		const tiltPosition = convertNumberToPosition(parseInt(tiltHex));

		return {
			pan: panPosition,
			tilt: tiltPosition,
		};
	}
}
