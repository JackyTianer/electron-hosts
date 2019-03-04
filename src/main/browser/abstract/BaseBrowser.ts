import {BrowserWindow, BrowserWindowConstructorOptions, shell} from 'electron';

abstract class BaseBrowser {
    public id: number;
    public browserWindow: BrowserWindow;

    protected constructor(opts: BrowserWindowConstructorOptions) {
        this.browserWindow = new BrowserWindow(opts);
        this.id = this.browserWindow.id;
        this.initWindowEvents();
    }

    protected initWindowEvents() {
        this.browserWindow.on('closed', () => {
            this.browserWindow = null;
        });
    }
}

export default BaseBrowser;
