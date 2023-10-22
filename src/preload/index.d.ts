import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      // Pattern 2 - 1
      ping: () => Promise<string>
      secondWindow: () => Promise<any>
      //
      // Pattern 2 - 2
      on: (cb: any) => Electron.IpcRenderer
      // async: () => void
      //
      // Pattern 2 - 3
      // sync: () => any
    }
  }
}
