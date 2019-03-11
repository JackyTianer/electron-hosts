import BaseService from './abstract/BaseService';
import {app} from 'electron';
import * as path from 'path';
import util from '../utils/util';
import {readJsonSync, writeJSONSync, readFileSync, writeFileSync, ensureFileSync, removeSync} from 'fs-extra';
import {Host, HostConfig} from "../electron-hosts";


const packageConfig = require('../../../package.json');
const hostDoc: string = path.join(app.getPath('userData'), 'hostFile/');
const MACOS_HOST_PATH: string = '/private/etc/hosts';

const initConfig: HostConfig = {
    version: packageConfig.version,
    hosts: [{
        id: util.generateId(),
        name: 'host备份',
        path: path.join(hostDoc, 'backup.txt')
    }],
    checkedHostIdList: []
};

class HostConfigService extends BaseService {
    private readonly configPath: string;

    protected static instance: HostConfigService = new HostConfigService();

    private constructor() {
        super();
        this.configPath = path.join(app.getPath('userData'), 'config.json');
        let obj = this.getConfig();
        if (obj === null) {
            this.writeConfigFile(initConfig);
            ensureFileSync(initConfig.hosts[0].path);
            writeFileSync(initConfig.hosts[0].path, readFileSync(MACOS_HOST_PATH, {
                encoding: 'utf8'
            }), {
                flag: 'w+'
            });
            return;
        }
        // if (obj.version !== packageConfig.version) {
        //     this.writeConfigFile(Object.assign({}, obj, {version: packageConfig.version}));
        // }
    }

    private writeConfigFile(content) {
        writeJSONSync(this.configPath, content, {
            encoding: 'utf8',
            flag: 'w+'
        })
    }

    public getConfig() {
        return readJsonSync(this.configPath, {throws: false});
    }

    public getHosts(): Array<Host> {
        return this.getConfig().hosts;
    }

    public getHostConfigById(id: number): Host {
        const hosts = this.getHosts();
        for (let h of hosts) {
            if (h.id === id) {
                return h;
            }
        }
        return null;
    }

    public getHostContentById(id: number): string {
        const config = this.getHostConfigById(id);
        if (!!config) {
            return readFileSync(config.path, {
                encoding: 'utf8'
            });
        }
        return '';
    }

    public updateHostContentById(id: number, content: string): boolean {
        const config = this.getConfig();
        const hostConfig = this.getHostConfigById(id);
        if (!!hostConfig) {
            writeFileSync(hostConfig.path, content, {
                encoding: 'utf8',
                flag: 'w+'
            });
            (config.checkedHostIdList.indexOf(id) !== -1) && this.updateHostFile();
            return true;
        }
        return false;
    }

    private updateHostFile() {
        const {hosts, checkedHostIdList} = this.getConfig();
        let content = '';
        for (let h of hosts) {
            if (checkedHostIdList.indexOf(h.id) !== -1) {
                content += readFileSync(h.path) + '\n';
            }
        }
        writeFileSync(MACOS_HOST_PATH, content);
    }

    public modifyCheckedHostIdList(id: number): Array<number> {
        let obj = this.getConfig();
        let index = obj.checkedHostIdList.indexOf(id);
        if (index !== -1) {
            obj.checkedHostIdList.splice(index, 1);
        } else {
            obj.checkedHostIdList.push(id);
        }
        this.writeConfigFile(obj);
        // 更新host文件
        this.updateHostFile();
        return obj.checkedHostIdList;
    }

    public addHost(name): Host {
        let obj = this.getConfig();
        const id = util.generateId();
        const host = {
            id,
            name,
            path: path.join(hostDoc, `${id}.txt`),
        };
        ensureFileSync(host.path);
        obj.hosts.push(host);
        this.writeConfigFile(obj);
        return host;
    }

    public removeHostById(id): boolean {
        let config = this.getConfig();
        let hosts = config.hosts;
        for (let i = 0; i < hosts.length; i++) {
            if (hosts[i].id === id) {
                removeSync(hosts[i].path);
                hosts.splice(i, 1);
                this.writeConfigFile(config);
                return true;
            }
        }
        return false;
    }

    public updateHostName(id, name): boolean {
        let config = this.getConfig();
        let hosts = config.hosts;
        for (let i = 0; i < hosts.length; i++) {
            if (hosts[i].id === id) {
                hosts[i].name = name;
                this.writeConfigFile(config);
                return true;
            }
        }
        return false;
    }

    public static getInstance(): HostConfigService {
        return this.instance;
    }

}

export default HostConfigService;
