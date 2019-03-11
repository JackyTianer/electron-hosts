import clientUtil from '../../common/utils/clientUtil';

export default {
    async getInitDataAction({ commit }) {
        const config = await clientUtil.perform('getConfig');
        commit('getInitData', config);
    },
    async modifyCheckedHostIdListAction({ commit }, id) {
        const checkedHostIdList = await clientUtil.perform('modifyCheckedHostIdList', { id });
        commit('modifyCheckedHostIdList', checkedHostIdList);
    },
    async addHostAction({ commit }, name) {
        // create file
        const newHost = await clientUtil.perform('addHost', { name });
        commit('addHost', newHost);
    },
    async removeHostByIdAction({ commit }, id) {
        const result = await clientUtil.perform('removeHostById', { id });
        if (result) {
            commit('removeHostById', id);
        }
    },
    async updateHostNameAction({ commit }, { id, name }) {
        const result = await clientUtil.perform('updateHostName', { id, name });
        if (result) {
            commit('updateHostName', { id, name });
        }
    }
};
