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

    private getConfig() {

        return HostConfigService.getInstance().getConfig();
    }

    private getHostGroups(): Array<{ id: number, name: string, hosts: [any] }> {
        return HostConfigService.getInstance().getHostGroups();
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

    private addHost({name}): { id: number, name: string, path: string } {
        return HostConfigService.getInstance().addHost(name);
    }
}


export default BrowserEventProcessor;
