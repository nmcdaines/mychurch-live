import { ViscaCommand } from '../abstractCommand'
import { hexToBuffer } from '../../core/hex';

/**
 * Note:
 * The maximum zoom for birddog is:
 * - HEX(4000) or
 * - DEC(16384).
 */

export class ZoomDirectCommand extends ViscaCommand {
  position: number

  serialize() {
    const buffer = hexToBuffer(this.position);
    return Buffer.from([0x81, 0x01, 0x04, 0x47, ...buffer, 0xff]);
  }
}
