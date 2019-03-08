import {ipcMain} from 'electron';
import HostConfigService from '../service/HostConfigService';
import {Host} from "../electron-hosts";


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

    private getConfig() {
        return HostConfigService.getInstance().getConfig();
    }

    private getHosts(): Array<Host> {
        return HostConfigService.getInstance().getHosts();
    }

    private getHostContentById({id}): string {
        return HostConfigService.getInstance().getHostContentById(id);
    }

    private updateHostContentById({id, content}): boolean {
        return HostConfigService.getInstance().updateHostContentById(id, content);
    }

    private modifyCheckedHostIdList({id}): Array<number> {
        return HostConfigService.getInstance().modifyCheckedHostIdList(id);
    }

    private addHost({name}): Host {
        return HostConfigService.getInstance().addHost(name);
    }

    private removeHostById({id}): boolean {
        return HostConfigService.getInstance().removeHostById(id);
    }
}


export default BrowserEventProcessor;
