import {app, BrowserWindow} from 'electron';
import BaseBrowser from "./browser/abstract/BaseBrowser";
import EditorBrowser from "./browser/EditorBrowser";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    // global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

// function createWindow() {
//     /**
//      * Initial window options
//      */
//     mainWindow = new BrowserWindow({
//         height: 563,
//         useContentSize: true,
//         width: 1000
//     });
//
//     mainWindow.loadURL(winURL);
//
//     mainWindow.on('closed', () => {
//         mainWindow = null
//     });
// }

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */


class Main {
    mainWindow: BaseBrowser;

    constructor() {
        app.on('ready', this.createWindow);

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        });
        app.on('activate', () => {
            if (this.mainWindow.browserWindow === null) {
                this.createWindow()
            }
        });
    }

    createWindow() {
        this.mainWindow = new EditorBrowser();
    }
}

export default Main;
