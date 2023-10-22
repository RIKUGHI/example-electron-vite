import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // Pattern 2 - 1
  ping: () => ipcRenderer.invoke('pattern-2'),
  secondWindow: () => ipcRenderer.invoke('second-window')
  //
  // Pattern 2 - 2
  // on: (cb) => ipcRenderer.on('asynchronous-reply', cb),
  // async: () => ipcRenderer.send('asynchronous-message', 'ping')
  //
  // Pattern 2 - 3
  // sync: () => ipcRenderer.sendSync('synchronous-message', 'ping')
}

// ipcRenderer.on('asynchronous-reply', (_event, arg) => {
//   console.log(arg) // prints "pong" in the DevTools console
// })

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
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
