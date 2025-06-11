// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { AsyncRemoteCallback } from "drizzle-orm/sqlite-proxy";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  execute: (...args: Parameters<AsyncRemoteCallback>) => {
    return ipcRenderer.invoke("db:execute", ...args);
  },
  device: {
    execute: (id: number, type: string, properties: Record<string, any>) =>
      console.log("device:execute(id) not implemented", id),
  },
  macro: {
    execute: (id: number) =>
      console.log("macro:execute(id) not implemented", id),
  },
});
