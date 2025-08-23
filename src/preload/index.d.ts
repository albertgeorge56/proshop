import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      minimize: () => void
      maximize: () => void
      unmaximize: () => void
      toggleMax: () => void
      close: () => void
      onMaximized: (cb: (event: any, value: boolean) => void) => void
      getBaseUrl: () => Promise<string>
    }
  }
}
