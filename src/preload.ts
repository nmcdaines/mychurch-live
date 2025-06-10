// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { AsyncRemoteCallback } from "drizzle-orm/sqlite-proxy";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  execute: (...args: Parameters<AsyncRemoteCallback>) => {
    return ipcRenderer.invoke("db:execute", ...args);
  },
});
