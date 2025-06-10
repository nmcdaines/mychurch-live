import { ViscaInquiryCommand } from '../abstractCommand'
import { bufferToHex } from '../../core/hex';

export class ZoomPositionCommand extends ViscaInquiryCommand {
	serialize () {
		return Buffer.from([ 0x81, 0x09, 0x04, 0x47, 0xff ])
	}

	deserialize (payload: Buffer): number {
		const zoomPayload = payload.slice(2, 6);
		const zoomHex = bufferToHex(zoomPayload);
		const zoom = parseInt(zoomHex);
		return zoom;
	}
}
