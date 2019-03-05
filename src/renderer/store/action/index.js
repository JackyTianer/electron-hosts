import clientUtil from '../../common/utils/clientUtil';

export default {
    async setHostGroupsAction({ commit }) {
        const hostGroup = await clientUtil.perform('getHostGroups');
        commit('setHostGroups', hostGroup);
    }
};
