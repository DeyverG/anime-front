// src-electron/main.ts
import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'

let mainWindow: BrowserWindow | undefined

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        useContentSize: true
    })

    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()

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