<template>
    <div id="app" class="m-hosts">
        <hosts-header class="header"></hosts-header>
        <div class="content">
            <hosts-sidebar class="left-content" :host-groups="hostGroups"></hosts-sidebar>
            <router-view class="right-content"></router-view>
        </div>
    </div>
</template>

<script>
    import HostsHeader from './components/HostsHeader';
    import HostsSidebar from './components/HostsSidebar';
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'electron-hosts',
        components: {
            'hosts-header': HostsHeader,
            'hosts-sidebar': HostsSidebar
        },
        computed: {
            ...mapState({
                hostGroups: (state) => state.hostGroups
            })
        },
        async mounted() {
            this.initData();
        },
        methods: {
            ...mapActions(['setHostGroupsAction']),
            initData() {
                this.setHostGroupsAction();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .m-hosts {
        box-sizing: border-box;
        padding-top: 50px;
        .content {
            display: flex;
            flex-flow: row nowrap;
            height: calc(100vh - 50px);
            .left-content {
                width: 200px;
            }
            .right-content {
                flex: 1;
            }
        }
    }
</style>
