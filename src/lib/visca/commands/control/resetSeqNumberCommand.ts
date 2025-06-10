import { ControlCommand } from '../abstractCommand'

export class ResetSequenceNumberCommand extends ControlCommand {
	serialize () {
		return Buffer.from([ 0x02, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x01 ])
	}
}
