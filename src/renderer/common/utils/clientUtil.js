let ipcRenderer;

const CHANEL_NAME = 'RENDER_COMMUNICATION_CHANNEL';

function call(api, { param } = {}) {
    if (!ipcRenderer) {
        ipcRenderer = window.require('electron').ipcRenderer;
    }
    let arg = {
        id: `${api}:${+new Date()}`,
        eventName: api
    };
    if (!!param) {
        arg.param = param;
    }
    return new Promise((resolve) => {
        ipcRenderer.once(arg.id, (sender, result) => {
            resolve(result);
        });
        ipcRenderer.send(CHANEL_NAME, arg);
    });
}

export default {
    perform(apiName, param) {
        try {
            return call(apiName, { param });
        } catch (e) {
            console.error(e);
        }
    }
};
