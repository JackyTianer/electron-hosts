export default {
    modifyCheckedHostIdListAction(state, idList) {
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
    }
};
