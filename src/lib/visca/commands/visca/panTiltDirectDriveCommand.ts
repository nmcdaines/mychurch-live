import { ViscaCommand } from '../abstractCommand';
import { hexToBuffer } from '../../core/hex';

function convertPositionToNumber(n: number) {
	const max = 65535;
	return n < 0 ? max + n : n;
}

export class PanTiltDirectDriveCommand extends ViscaCommand {
  panSpeed: number = 0;
  tiltSpeed: number = 0;
  
  panPosition: number = 0;
  tiltPosition: number = 0;

	serialize () {
    const buffer = Buffer.alloc(2);
    
		buffer.writeUInt8(this.panSpeed, 0)
    buffer.writeUInt8(this.tiltSpeed, 1)

    const panValue = convertPositionToNumber(this.panPosition);
    const panHex = hexToBuffer(panValue);

    const tiltValue = convertPositionToNumber(this.tiltPosition);
    const tiltHex = hexToBuffer(tiltValue);

		return Buffer.from([ 0x81, 0x01, 0x06, 0x02, ...buffer, ...panHex, ...tiltHex, 0xff ])
	}
}
