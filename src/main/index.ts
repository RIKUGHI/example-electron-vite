import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'

// Pattern 2 - 1
let x = 0
let secondWindow: undefined | BrowserWindow

ipcMain.handle('pattern-2', (e) => {
  return new Promise((res) => {
    setTimeout(() => {
      const count = x++
      res(`${'pattern-2_' + count}`)
      secondWindow?.webContents.send('asynchronous-reply-2', count)
    }, 3000)
  })
})

ipcMain.handle('second-window', () => {
  console.log('berwindow')
  secondWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/second.js'),
      sandbox: false
    }
  })

  secondWindow.on('ready-to-show', () => {
    secondWindow?.show()
  })

  secondWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    secondWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/index2.html`)
  } else {
    secondWindow.loadFile(join(__dirname, '../renderer/index2.html'))
  }
})

// Pattern 2 - 2
// let x = 0

// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg)
//   setTimeout(() => {
//     event.reply('asynchronous-reply', `${'pong_' + x++}`)
//   }, 3000)
// })

// Pattern 2 - 3
// let x = 0

// ipcMain.on('synchronous-message', async (event, arg) => {
//   console.log(arg)

//   await new Promise((res, rej) => {
//     setTimeout(() => {
//       res('')
//     }, 3000)
//   })

//   event.returnValue = `${'pong_' + x++}`
// })

function createWindow(): void {
  // fs.mkdirSync(path.resolve('assets'))

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
