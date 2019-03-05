import BaseService from './abstract/BaseService';
import {app} from 'electron';
import * as path from 'path';
import {readJsonSync, writeJSONSync} from 'fs-extra';

const packageConfig = require('../../../package.json');

const initConfig = {
    version: packageConfig.version,
    hostGroups: []
};

class HostConfigService extends BaseService {
    private readonly configPath: string;

    protected static instance: HostConfigService = new HostConfigService();

    private constructor() {
        super();
        this.configPath = path.join(app.getPath('userData'), 'config.json');
        const obj = readJsonSync(this.configPath, {throws: false});
        if (obj === null) {
            writeJSONSync(this.configPath, initConfig, {
                flag: 'w+'
            })
        }
        if (obj.version ! == packageConfig.version) {
            writeJSONSync(this.configPath, Object.assign({}, initConfig, {version: packageConfig.version}), {
                flag: 'w+'
            })
        }
    }

    public getHostGroups(): Array<any> {
        return readJsonSync(this.configPath).hostGroups;
    }

    public static getInstance(): HostConfigService {
        return this.instance;
    }

}

export default HostConfigService;
