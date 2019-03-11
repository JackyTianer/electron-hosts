export declare interface Host {
    id: number;
    name: string;
    path: string;
}


export declare interface HostConfig {
    version: string;
    hosts: Array<Host>;
    checkedHostIdList: Array<number>
}


