import BaseService from './abstract/BaseService';
import {app} from 'electron';
import * as path from 'path';
import {readJsonSync, writeJSONSync, readFileSync, writeFileSync, ensureFileSync} from 'fs-extra';

const packageConfig = require('../../../package.json');

const initConfig = {
    version: packageConfig.version,
    hostGroups: [{
        id: +new Date(),
        name: '默认组',
        hosts: [{
            id: +new Date(),
            name: '默认',
            path: path.join(app.getPath('userData'), 'hostFile/defaultHost.txt')
        }, {
            id: +new Date(),
            name: '默认',
            path: path.join(app.getPath('userData'), 'hostFile/residentHost.txt')
        }]
    }]
};

class HostConfigService extends BaseService {
    private readonly configPath: string;

    protected static instance: HostConfigService = new HostConfigService();

    private constructor() {
        super();
        this.configPath = path.join(app.getPath('userData'), 'config.json');
        let obj = readJsonSync(this.configPath, {throws: false});
        ensureFileSync(initConfig.hostGroups[0].hosts[0].path);
        ensureFileSync(initConfig.hostGroups[0].hosts[1].path);
        if (obj === null) {
            obj = initConfig;
            writeJSONSync(this.configPath, initConfig, {
                flag: 'w+'
            });
            writeFileSync(initConfig.hostGroups[0].hosts[0].path, readFileSync('/private/etc/hosts', {
                encoding: 'utf8'
            }), {
                flag: 'w+'
            });
            writeFileSync(initConfig.hostGroups[0].hosts[1].path, '', {
                flag: 'w+'
            });
        }
        if (obj.version ! == packageConfig.version) {
            writeJSONSync(this.configPath, Object.assign({}, initConfig, {version: packageConfig.version}), {
                flag: 'w+'
            })
        }
    }

    public getHostGroups(): Array<any> {
        console.log(1);
        return readJsonSync(this.configPath).hostGroups;
    }

    public static getInstance(): HostConfigService {
        return this.instance;
    }

}

export default HostConfigService;
