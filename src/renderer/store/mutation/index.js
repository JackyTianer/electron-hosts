export default {
    modifyCheckedHostIdListAction(state, idList) {
        state.checkedHostIdList = [...idList];
    },
    getInitData(state, { hostGroups, checkedHostIdList }) {
        state.hostGroups = hostGroups;
        state.checkedHostIdList = [...checkedHostIdList];
    },
    addHost(state, host) {
        state.hostGroups[0].hosts = [...state.hostGroups[0].hosts, host];
    },
    removeHostById(state, id) {
        state.hostGroups[0].hosts = state.hostGroups[0].hosts.filter((item) => item.id !== id);
    }
};
