import {ipcMain} from 'electron';
import HostConfigService from '../service/HostConfigService';

class BrowserEventProcessor {
    channel: string = 'RENDER_COMMUNICATION_CHANNEL';

    constructor() {
    }

    public on(): void {
        ipcMain.on(this.channel, async (ev, args) => {
            try {
                let resp = await this[args.eventName].call(this, args.param || {});
                if (!!args.id && (!!resp || resp === false)) {
                    ev.sender.send(args.id, resp);
                }
            } catch (e) {
                console.error(e);
            }
        })
    }

    public off(): void {
        ipcMain.removeAllListeners(this.channel);
    }

    private getHostGroups(): Array<any> {
        return HostConfigService.getInstance().getHostGroups();
    }
}

export default BrowserEventProcessor;
