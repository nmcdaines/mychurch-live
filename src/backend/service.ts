import {db} from '@/backend/db'
import {devicesTable} from "@/backend/schema";
import {schema} from "@/frontend/db";
import {BirddogDevice} from "@/backend/devices/atem";
import {AtemDevice} from "@/backend/devices/birddog";



export interface IHooks {
  onConnected?: any;
  onChange?: any;
  onDisconnected?: any;
}

// const POLL_TIME = 1_000;
//
// interface IViscaDeviceMap {
//   [key: string]: any;
//   pan?: number | undefined;
//   tilt?: number | undefined;
//   zoom?: number | undefined;
// }


export abstract class Device {
  _status: 'connecting' | 'connected' | 'disconnected' | 'unknown';

  constructor(
    public readonly id: number,
    public readonly ipAddress: string,
    // public hooks?: IHooks,
  ) {
    this._status = 'disconnected';
  }

  async tryConnect() {

  }

  abstract connect(): Promise<void> | void;

  abstract disconnect(): Promise<void> | void;

  // onConnected(): void {
  //   this._status = 'connected';
  //   if (this.hooks?.onConnected) {
  //     this.hooks.onConnected(this);
  //   }
  // };
  // onDisconnected(): void {
  //   this._status = 'disconnected';
  //   if (this.hooks?.onDisconnected) {
  //     this.hooks.onDisconnected(this);
  //   }
  // };

  // abstract getState(): any;
  // onStateChange(state): any {
  //   if (this.hooks?.onChange) {
  //     this.hooks.onChange({
  //       ...state
  //     }, this);
  //   }
  // };

  // abstract execute(action: IAction);
  abstract destroy(): Promise<void> | void;

  public get status() {
    return this._status;
  }

  static create<T extends Device>(Ctor: new (...args: any[]) => T, ...args: ConstructorParameters<typeof Ctor>): T {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new Ctor(...args)
  }
}





function createDeviceFromDbRecord(device: typeof schema.devicesTable.$inferSelect) {
  const deviceConnectionType = ({
    'birddog': BirddogDevice,
    'atem': AtemDevice,
  }[device.type])

  if (!deviceConnectionType) {
    throw new Error(`implementation doesn't exist for ${device.id} with type ${device.type}`);
  }

  return Device.create(deviceConnectionType, device.id, device.type)
}

class DeviceService {
  public logs: string[] = []

  // private service = [];
  private deviceConnections: Map<number, Device> = new Map();
  //
  // registerService = (id: number) => {
  //
  // }
  //
  // private async destroyDevice(deviceId: string): Promise<void> {
  //   this.logger.log(`destroying device ${deviceId}`);
  //   await this.deviceConnections.get(deviceId)?.destroy();
  //   this.deviceConnections.delete(deviceId);
  // }
  //
  // private async createConnection(device: DeviceEntity) {
  //   const { id, ipAddress, type } = device;
  //   let connection: Device;
  //
  //   const hooks: IHooks = {
  //     onConnected: this.onConnected(id),
  //     onDisconnected: this.onDisconnected(id),
  //     onChange: this.onStateChange(id),
  //   }
  //
  //   if (type == 'atem') {
  //     connection = new AtemDevice(id, ipAddress, hooks);
  //   } else if (type =='birddog') {
  //     connection = new BirddogDevice(id, ipAddress, hooks);
  //   }
  //
  //   if (!connection) { return; }
  //   await connection.connect();
  //   return connection;
  // }
  //
  // async handleTryConnect() {
  //   const localDeviceIds = Object.keys(this.deviceConnections);
  //   const remoteDevices = await this.deviceRepository.find();
  //   const remoteDeviceIds = new Set(remoteDevices.map((device) => device.id));
  //
  //   // Remove devices that have been removed from db
  //   const removedDeviceIds = localDeviceIds.filter((deviceId) => !remoteDeviceIds.has(deviceId));
  //   if (removedDeviceIds.length > 0) {
  //     this.logger.log(`The following devices have been identified for removal ${JSON.stringify(removedDeviceIds)}`);
  //   }
  //   await Promise.all(
  //     removedDeviceIds.map((deviceId) => this.destroyDevice(deviceId))
  //   );
  //
  //   //
  //   await Promise.all(
  //     remoteDevices.map(async (device) => {
  //       const existingConnection = this.deviceConnections.get(device.id);
  //       const ipChanged = device.ipAddress != existingConnection?.ipAddress;
  //
  //       if (existingConnection && existingConnection.status === 'disconnected') {
  //         this.logger.log(`Attempting to reconnect to: ${device.id}, ${device.ipAddress}`);
  //         return existingConnection.connect();
  //       }
  //
  //       // Device is fine, move on
  //       if (existingConnection && !ipChanged) { return; }
  //
  //       await this.destroyDevice(device.id);
  //
  //       const connection = await this.createConnection(device);
  //       this.deviceConnections.set(device.id, connection);
  //     })
  //   );
  // }
  //

  async onStartup() {
    const devices = await db.select().from(schema.devicesTable).all()

    for (const device of devices) {
      try {
        await this
          .addConnection(device.id, this.addConnection(device.id, createDeviceFromDbRecord(device)))
          .tryConnect()
      } catch (error) {
        this.logs.push(`error connecting to device ${device.id} with type ${device.type}`);
      }
    }
  }

  addConnection(id: number, device: Device) {
    this.deviceConnections.set(id, device)
    return device
  }
}

export default new DeviceService();