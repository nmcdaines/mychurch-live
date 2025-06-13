import {Device} from "@/backend/service";
// import { Atem, AtemState } from "atem-connection";

export class BirddogDevice extends Device {
//   viscaDevice: ViscaDevice;
//   private state: IViscaDeviceMap = { type: 'birddog' };
//   private timeout?: NodeJS.Timeout;
//
//   constructor(
//     public readonly id: string,
//     public readonly ipAddress: string,
//     public hooks?: IHooks,
//   ) {
//     super(id, ipAddress, hooks);
//
//     this.viscaDevice = new ViscaDevice(ipAddress);
//
//     this.viscaDevice.on('connected', this.onConnected);
//     this.viscaDevice.on('disconnected', this.onDisconnected);
//   }
//
//   connect(): void {
//     this._status = 'connecting';
//     this.viscaDevice.connect();
//   }
//   disconnect(): void {
//     this._status = 'disconnected';
//     this.viscaDevice.disconnect();
//   }
//
//   private inquire = async () => {
//     const positionInquiry = new InquiryCommands.PanTiltPositionCommand();
//     const zoomInqquiry = new InquiryCommands.ZoomPositionCommand();
//
//     const [positionResponse, zoomResponse]: any = await Promise.all([
//       this.viscaDevice.sendCommand(positionInquiry),
//       this.viscaDevice.sendCommand(zoomInqquiry),
//     ]);
//
//     // console.log(positionResponse, zoomResponse)
//
//     if (
//       isNaN(positionResponse?.pan) ||
//       isNaN(positionResponse?.tilt) ||
//       isNaN(zoomResponse) ||
//       zoomResponse === 15
//     ) {
//       return;
//     }
//
//     this.onStateChange({
//       type: 'birddog',
//       pan: positionResponse?.pan,
//       tilt: positionResponse?.tilt,
//       zoom: zoomResponse,
//     });
//   }
//
//   private async getInitialState() {
//     await this.inquire();
//     return this.state;
//   }
//
//   onConnected = async () => {
//     this._status = 'connected';
//     super.onConnected();
//     await this.getInitialState();
//     this.timeout = setInterval(this.inquire, POLL_TIME);
//   }
//   onDisconnected = (): void => {
//     this._status = 'disconnected';
//     super.onDisconnected();
//     clearInterval(this.timeout);
//   }
//   onStateChange = (state: IViscaDeviceMap): void => {
//     if (JSON.stringify(this.state) !== JSON.stringify(state)) {
//       this.state = state;
//       super.onStateChange(state);
//     }
//   }
//
//   getState(): IViscaDeviceMap {
//     return this.state;
//   }
//
//   async destroy(): Promise<void> {
//     await this.viscaDevice.disconnect()
//   }
}