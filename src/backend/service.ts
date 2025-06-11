import {devicesTable} from "@/backend/schema";
import {ViscaDevice, InquiryCommands} from "@/lib/visca";
import { Atem, AtemState } from "atem-connection";

export interface IHooks {
  onConnected?: any;
  onChange?: any;
  onDisconnected?: any;
}

const POLL_TIME = 1_000;

interface IViscaDeviceMap {
  [key: string]: any;
  pan?: number | undefined;
  tilt?: number | undefined;
  zoom?: number | undefined;
}


export abstract class Device {
  _status: 'connecting' | 'connected' | 'disconnected' | 'unknown';

  constructor(
    public readonly id: string,
    public readonly ipAddress: string,
    public hooks?: IHooks,
  ) {
    this._status = 'disconnected';
  }

  abstract connect(): Promise<void> | void;
  abstract disconnect(): Promise<void> | void;

  onConnected(): void {
    this._status = 'connected';
    if (this.hooks?.onConnected) {
      this.hooks.onConnected(this);
    }
  };
  onDisconnected(): void {
    this._status = 'disconnected';
    if (this.hooks?.onDisconnected) {
      this.hooks.onDisconnected(this);
    }
  };

  abstract getState(): any;
  onStateChange(state): any {
    if (this.hooks?.onChange) {
      this.hooks.onChange({
        ...state
      }, this);
    }
  };

  // abstract execute(action: IAction);
  abstract destroy(): Promise<void> | void;

  public get status() {
    return this._status;
  }
}


export class BirddogDevice extends Device {
  viscaDevice: ViscaDevice;
  private state: IViscaDeviceMap = { type: 'birddog' };
  private timeout?: NodeJS.Timeout;

  constructor(
    public readonly id: string,
    public readonly ipAddress: string,
    public hooks?: IHooks,
  ) {
    super(id, ipAddress, hooks);

    this.viscaDevice = new ViscaDevice(ipAddress);

    this.viscaDevice.on('connected', this.onConnected);
    this.viscaDevice.on('disconnected', this.onDisconnected);
  }

  connect(): void {
    this._status = 'connecting';
    this.viscaDevice.connect();
  }
  disconnect(): void {
    this._status = 'disconnected';
    this.viscaDevice.disconnect();
  }

  private inquire = async () => {
    const positionInquiry = new InquiryCommands.PanTiltPositionCommand();
    const zoomInqquiry = new InquiryCommands.ZoomPositionCommand();

    const [positionResponse, zoomResponse]: any = await Promise.all([
      this.viscaDevice.sendCommand(positionInquiry),
      this.viscaDevice.sendCommand(zoomInqquiry),
    ]);

    // console.log(positionResponse, zoomResponse)

    if (
      isNaN(positionResponse?.pan) ||
      isNaN(positionResponse?.tilt) ||
      isNaN(zoomResponse) ||
      zoomResponse === 15
    ) {
      return;
    }

    this.onStateChange({
      type: 'birddog',
      pan: positionResponse?.pan,
      tilt: positionResponse?.tilt,
      zoom: zoomResponse,
    });
  }

  private async getInitialState() {
    await this.inquire();
    return this.state;
  }

  onConnected = async () => {
    this._status = 'connected';
    super.onConnected();
    await this.getInitialState();
    this.timeout = setInterval(this.inquire, POLL_TIME);
  }
  onDisconnected = (): void => {
    this._status = 'disconnected';
    super.onDisconnected();
    clearInterval(this.timeout);
  }
  onStateChange = (state: IViscaDeviceMap): void => {
    if (JSON.stringify(this.state) !== JSON.stringify(state)) {
      this.state = state;
      super.onStateChange(state);
    }
  }

  getState(): IViscaDeviceMap {
    return this.state;
  }

  async destroy(): Promise<void> {
    await this.viscaDevice.disconnect()
  }
}

export class AtemDevice extends Device {
  public atem: Atem;

  constructor(
    public readonly id: string,
    public readonly ipAddress: string,
    public hooks?: IHooks,
  ) {
    super(id, ipAddress, hooks);

    this.atem = new Atem({ address: ipAddress });

    this.atem.on('connected', this.onConnected);
    this.atem.on('disconnected', this.onDisconnected);
    this.atem.on('stateChanged', this.onStateChange);
  }

  connect(): Promise<void> {
    this._status = 'connecting';
    return this.atem.connect(this.ipAddress);
  }
  disconnect(): Promise<void> {
    return this.atem.disconnect();
  }

  /* NOTE: an anonymous function is required in order to
   * to bind onConnected, onDisconnected, and onStateChange
   * to this class instance instead of the Atem class instance
   */
  onConnected = (): void => {
    super.onConnected();
  }
  onDisconnected = (): void => {
    super.onDisconnected();
  }
  onStateChange = (state: AtemState): void => {
    super.onStateChange(state);
  }

  getState(): AtemState {
    return this.atem?.state;
  }

  async destroy(): Promise<void> {
    this._status = 'disconnected';
    await this.atem.destroy();
  }

  getAtem(): Atem {
    return this.atem;
  }
}

class DeviceService {
  private service = [];
  private deviceConnections: Map<string, Device | AtemDevice | BirddogDevice> = new Map();

  registerService = (id: number) => {

  }

  private async destroyDevice(deviceId: string): Promise<void> {
    this.logger.log(`destroying device ${deviceId}`);
    await this.deviceConnections.get(deviceId)?.destroy();
    this.deviceConnections.delete(deviceId);
  }

  private async createConnection(device: DeviceEntity) {
    const { id, ipAddress, type } = device;
    let connection: Device;

    const hooks: IHooks = {
      onConnected: this.onConnected(id),
      onDisconnected: this.onDisconnected(id),
      onChange: this.onStateChange(id),
    }

    if (type == 'atem') {
      connection = new AtemDevice(id, ipAddress, hooks);
    } else if (type =='birddog') {
      connection = new BirddogDevice(id, ipAddress, hooks);
    }

    if (!connection) { return; }
    await connection.connect();
    return connection;
  }

  async handleTryConnect() {
    const localDeviceIds = Object.keys(this.deviceConnections);
    const remoteDevices = await this.deviceRepository.find();
    const remoteDeviceIds = new Set(remoteDevices.map((device) => device.id));

    // Remove devices that have been removed from db
    const removedDeviceIds = localDeviceIds.filter((deviceId) => !remoteDeviceIds.has(deviceId));
    if (removedDeviceIds.length > 0) {
      this.logger.log(`The following devices have been identified for removal ${JSON.stringify(removedDeviceIds)}`);
    }
    await Promise.all(
      removedDeviceIds.map((deviceId) => this.destroyDevice(deviceId))
    );

    //
    await Promise.all(
      remoteDevices.map(async (device) => {
        const existingConnection = this.deviceConnections.get(device.id);
        const ipChanged = device.ipAddress != existingConnection?.ipAddress;

        if (existingConnection && existingConnection.status === 'disconnected') {
          this.logger.log(`Attempting to reconnect to: ${device.id}, ${device.ipAddress}`);
          return existingConnection.connect();
        }

        // Device is fine, move on
        if (existingConnection && !ipChanged) { return; }

        await this.destroyDevice(device.id);

        const connection = await this.createConnection(device);
        this.deviceConnections.set(device.id, connection);
      })
    );
  }

}

export default new DeviceService();