import {app} from 'electron';
import BaseBrowser from "./browser/abstract/BaseBrowser";
import HostConfigService from './service/HostConfigService';
import EditorBrowser from "./browser/EditorBrowser";
import BrowserEventProcessor from './processor/BrowserEventProcessor';

class Main {
    mainWindow: BaseBrowser;

    constructor() {
        HostConfigService.getInstance();
        new BrowserEventProcessor().on();
        app.on('ready', this.createWindow);
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        });
        app.on('activate', () => {
            // console.log(this.mainWindow.browserWindow);
            // if (this.mainWindow.browserWindow === null) {
            //     this.createWindow()
            // }
        });
    }

    createWindow() {
        this.mainWindow = new EditorBrowser();
    }
}

export default Main;
