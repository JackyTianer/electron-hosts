import BaseBrowser from './abstract/BaseBrowser';

const browserBaseConfig = {
    width: 960,
    height: 550,
    resizable: true,
    center: true,
    show: true,
    autoHideMenuBar: false,
    icon: 'assets/icon.png',
    webPreferences: {
        devTools: true
    }
};

const WIN_URL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;


class EditorBrowser extends BaseBrowser {
    constructor() {
        super(browserBaseConfig);
        this.browserWindow.loadURL(WIN_URL);
    }
}

export default EditorBrowser;
