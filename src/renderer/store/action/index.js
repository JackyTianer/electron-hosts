import clientUtil from '../../common/utils/clientUtil';

export default {
    async getInitDataAction({ commit }) {
        const config = await clientUtil.perform('getConfig');
        commit('getInitData', config);
    },
    async modifyCheckedHostIdListAction({ commit }, id) {
        const checkedHostIdList = await clientUtil.perform('modifyCheckedHostIdList', { id });
        commit('modifyCheckedHostIdListAction', checkedHostIdList);
    },
    async addHostAction({ commit, state }, name) {
        // create file
        const newHost = await clientUtil.perform('addHost', { name });
        commit('addHost', newHost);
    }
};
