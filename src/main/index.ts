import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
// import { Album } from '../entities/Album'
// import { Photo } from '../entities/Photo'
import { AppDataSource } from './data-source'
import { Post } from '../entities/Post'

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new photo into the database...')
    /**
     * use EntityManager
     */
    // const photo = new Photo()
    // photo.name = 'Me and Bears'
    // photo.description = 'I am near polar bears'
    // photo.filename = 'photo-with-bears.jpg'
    // photo.views = 1
    // photo.isPublished = true
    // await AppDataSource.manager.save(photo)
    // console.log('Saved a new photo with id: ' + photo.id)

    // console.log('Loading photos from the database...')
    // const photos = await AppDataSource.manager.find(Photo)
    // console.log('Loaded photos: ', photos)

    /**
     * use Repository
     */
    // const photo = new Photo()
    // photo.name = 'Me and Bears'
    // photo.description = 'I am near polar bears'
    // photo.filename = 'photo-with-bears.jpg'
    // photo.views = 1
    // photo.isPublished = true

    // const photoRepository = AppDataSource.getRepository(Photo)
    // await photoRepository.save(photo)
    // console.log('Photo has been saved', photo.id)

    // console.log('Loading photos from the database...')
    // const photos = await photoRepository.find()
    // console.log('Loaded photos: ', photos)

    /**
     * one-to-one relationship
     */
    // console.log('========================================')

    // // create a photo
    // const photo = new Photo()
    // photo.name = 'Me and Bears'
    // photo.description = 'I am near polar bears'
    // photo.filename = 'photo-with-bears.jpg'
    // photo.views = 1
    // photo.isPublished = true

    // // create a photo metadata
    // const metadata = new PhotoMetadata()
    // metadata.height = 640
    // metadata.width = 480
    // metadata.compressed = true
    // metadata.comment = 'cybershoot'
    // metadata.orientation = 'portrait'
    // metadata.photo = photo // this way we connect them

    // // get entity repositories
    // const photoRepository = AppDataSource.getRepository(Photo)
    // const metadataRepository = AppDataSource.getRepository(PhotoMetadata)

    // // first we should save a photo
    // // await photoRepository.save(photo)

    // // photo is saved. Now we need to save a photo metadata
    // // await metadataRepository.save(metadata)

    // // const photos = await photoRepository.find({
    // //   relations: {
    // //     metadata: true
    // //   }
    // // })

    // const photos = await AppDataSource.getRepository(Photo)
    //   .createQueryBuilder('photo')
    //   .innerJoinAndSelect('photo.metadata', 'metadata')
    //   .getMany()
    // console.log('photos: ', photos)

    /**
     * many-to-many relationship
     */
    // console.log('========================================')
    // create a few albums
    // const album1 = new Album()
    // album1.name = 'Bears'
    // await AppDataSource.manager.save(album1)

    // const album2 = new Album()
    // album2.name = 'Me'
    // await AppDataSource.manager.save(album2)

    // create a few photos
    // const photo = new Photo()
    // photo.name = 'Me and Bears'
    // photo.description = 'I am near polar bears'
    // photo.filename = 'photo-with-bears.jpg'
    // photo.views = 1
    // photo.isPublished = true
    // photo.albums = [album1, album2]
    // await AppDataSource.manager.save(photo)

    // now our photo is saved and albums are attached to it
    // now lets load them:
    // const loadedPhoto = await AppDataSource.getRepository(Photo).findOne({
    //   where: {
    //     id: 4
    //   },
    //   relations: {
    //     albums: true
    //   }
    // })
    // console.log('photos: ', loadedPhoto)

    /**
     * migrations
     */
    const post = new Post()
    post.name = 'wew'
    // console.log(await AppDataSource.runMigrations())
    // console.log(await AppDataSource.showMigrations())
    await AppDataSource.runMigrations()
    // await AppDataSource.manager.save(post)
    // console.log(await AppDataSource.undoLastMigration())

    console.log('success')
  })
  .catch((error) => console.log('bergetar', error))

// Pattern 2 - 1
let x = 0
let secondWindow: undefined | BrowserWindow

ipcMain.handle('pattern-2', () => {
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
    // mainWindow.webContents.toggleDevTools()
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
