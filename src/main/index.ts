import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { startServer } from './server'

let mainWindow: BrowserWindow
let splashWindow: BrowserWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: screen.getPrimaryDisplay().workAreaSize.width - 100,
    height: screen.getPrimaryDisplay().workAreaSize.height - 100,
    show: false,
    autoHideMenuBar: true,
    icon,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    if (splashWindow && !splashWindow.isDestroyed()) {
      splashWindow.close()
    }
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.on('system-context-menu', (event, _point) => {
    event.preventDefault()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadURL('http://localhost:3000')
    // mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  if (mainWindow && !mainWindow.isDestroyed()) {
    ipcMain.on('window:minimize', () => mainWindow.minimize())
    ipcMain.on('window:toggleMax', () => {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
      } else {
        mainWindow.maximize()
      }
    })

    mainWindow.on('maximize', () => {
      mainWindow.webContents.send('window:isMaximized', true)
    })

    mainWindow.on('unmaximize', () => {
      console.log('unmaximized')
      mainWindow.webContents.send('window:isMaximized', false)
    })

    ipcMain.on('window:close', () => app.quit())

    if (process.env.DEBUG_TOOLS === 'true') {
      mainWindow.webContents.openDevTools({ mode: 'detach' })
    }
  }
}

function createSplash(): void {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    icon,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    center: true
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    splashWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/splash.html`)
  } else {
    splashWindow.loadFile(join(__dirname, '../renderer/splash.html'))
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.on('ping', () => console.log('pong'))
  createSplash()
  try {
    await startServer()
    createWindow()
  } catch (error) {
    console.error('SERVER ERROR', error)
    app.quit()
  }
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
