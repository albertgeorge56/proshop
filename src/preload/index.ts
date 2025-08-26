import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  minimize: () => ipcRenderer.send('window:minimize'),
  toggleMax: () => ipcRenderer.send('window:toggleMax'),
  onMaximized: (cb: (event: any, value: boolean) => void) => {
    ipcRenderer.on('window:isMaximized', cb)
  },
  close: () => ipcRenderer.send('window:close')
  // getPort: () => ipcRenderer.invoke('get-port')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
