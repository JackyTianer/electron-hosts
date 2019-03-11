export default {
    modifyCheckedHostIdList(state, idList) {
        state.checkedHostIdList = [...idList];
    },
    getInitData(state, { hosts, checkedHostIdList }) {
        state.hosts = hosts;
        state.checkedHostIdList = [...checkedHostIdList];
    },
    addHost(state, host) {
        state.hosts = [...state.hosts, host];
    },
    removeHostById(state, id) {
        state.hosts = state.hosts.filter((item) => item.id !== id);
    },
    updateHostName(state, { id, name }) {
        state.hosts.forEach((item) => {
            if (item.id === id) {
                item.name = name;
            }
        });
    }
};
