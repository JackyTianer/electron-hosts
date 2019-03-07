import BaseService from './abstract/BaseService';
import {app} from 'electron';
import * as path from 'path';
import util from '../utils/util';
import {readJsonSync, writeJSONSync, readFileSync, writeFileSync, ensureFileSync, removeSync} from 'fs-extra';

const packageConfig = require('../../../package.json');
const hostDoc = path.join(app.getPath('userData'), 'hostFile/');

const initConfig = {
    version: packageConfig.version,
    hostGroups: [{
        id: util.generateId(),
        name: '默认组',
        hosts: [{
            id: util.generateId(),
            name: '默认host',
            path: path.join(hostDoc, 'defaultHost.txt')
        }, {
            id: util.generateId(),
            name: '常驻host',
            path: path.join(hostDoc, 'residentHost.txt')
        }]
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
        ensureFileSync(initConfig.hostGroups[0].hosts[0].path);
        ensureFileSync(initConfig.hostGroups[0].hosts[1].path);
        if (obj === null) {
            this.writeConfigFile(initConfig);
            writeFileSync(initConfig.hostGroups[0].hosts[0].path, readFileSync('/private/etc/hosts', {
                encoding: 'utf8'
            }), {
                flag: 'w+'
            });
            writeFileSync(initConfig.hostGroups[0].hosts[1].path, '', {
                flag: 'w+'
            });
        } else if (obj.version !== packageConfig.version) {
            this.writeConfigFile(Object.assign({}, obj, {version: packageConfig.version}));
        }
    }

    private writeConfigFile(content) {
        writeJSONSync(this.configPath, content, {
            encoding: 'utf8',
            flag: 'w+'
        })
    }

    public getConfig() {
        return readJsonSync(this.configPath);
    }

    public getHostGroups(): Array<{ id: number, name: string, hosts: [any] }> {
        return this.getConfig().hostGroups;
    }

    public getHostConfigById(id: number): { id: number, name: string, path: string } {
        const groups = this.getHostGroups();
        for (let g of groups) {
            for (let h of g.hosts) {
                if (h.id === id) {
                    return h;
                }
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
        const config = this.getHostConfigById(id);
        if (!!config) {
            writeFileSync(config.path, content, {
                encoding: 'utf8',
                flag: 'w+'
            });
            return true;
        }
        return false;
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
        return obj.checkedHostIdList;
    }

    public addHost(name): { id: number, name: string, path: string } {
        let obj = this.getConfig();
        const id = util.generateId();
        const host = {
            id,
            name,
            path: path.join(hostDoc, `${id}.txt`),
        };
        ensureFileSync(host.path);
        obj.hostGroups[0].hosts.push(host);
        this.writeConfigFile(obj);
        return host;
    }

    public removeHostById(id): boolean {
        let config = this.getConfig();
        let groups = config.hostGroups;
        for (let g of groups) {
            for (let i = 0; i < g.hosts.length; i++) {
                if (g.hosts[i].id === id) {
                    removeSync(g.hosts[i].path);
                    g.hosts.splice(i, 1);
                    this.writeConfigFile(config);
                    return true;
                }
            }
        }
        return false;
    }

    public static getInstance(): HostConfigService {
        return this.instance;
    }
}

export default HostConfigService;
