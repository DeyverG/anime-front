/* eslint-disable @typescript-eslint/no-var-requires */
// src-electron/main.ts
import { app, BrowserWindow, dialog } from 'electron'
import pkg from 'electron-updater'

const { autoUpdater } = pkg

let mainWindow: BrowserWindow | undefined

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        useContentSize: true
    })

    mainWindow.loadFile('./dist/index.html')
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = undefined
    })

    autoUpdater.checkForUpdatesAndNotify();

    mainWindow.on('restart-app', () => {
        autoUpdater.quitAndInstall();
    });

    // Verificaciones de actualizaciones
    // Eventos de autoUpdater para verificar el estado
    autoUpdater.on('update-available', (info) => {
        dialog.showMessageBox({ message: 'Actualización disponible, descargando versión:' + info.version });
    });

    autoUpdater.on('error', (err) => {
        dialog.showErrorBox('Error in auto-updater', err == null ? "unknown" : (err.stack || err).toString());
    });

    autoUpdater.on('update-downloaded', () => {
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