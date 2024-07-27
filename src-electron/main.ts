/* eslint-disable @typescript-eslint/no-var-requires */
// src-electron/main.ts
import { app, BrowserWindow } from 'electron'
import pkg from 'electron-updater'

const { autoUpdater } = pkg

let mainWindow: BrowserWindow | undefined

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        useContentSize: true
    })

    mainWindow.loadURL('http://localhost:5173')
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = undefined
    })
    mainWindow.on('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });

    mainWindow.on('restart-app', () => {
        autoUpdater.quitAndInstall();
    });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow == null) {
        createWindow()
    }
})

// Cerrar la aplicacion en segundo plano
app.on('before-quit', () => {
    mainWindow?.destroy()
})