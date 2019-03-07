<template>
    <div id="app" class="m-hosts">
        <hosts-header class="header"></hosts-header>
        <div class="content">
            <hosts-sidebar class="left-content" :host-groups="hostGroups"
                           :checked-host-id-list="checkedHostIdList"></hosts-sidebar>
            <router-view class="right-content" v-if="isSubRouterAlive"></router-view>
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
                checkedHostIdList: (state) => state.checkedHostIdList,
                hostGroups: (state) => state.hostGroups
            })
        },
        async mounted() {
            this.initData();
        },
        provide() {
            return {
                refresh: this.refresh
            };
        },
        data() {
            return {
                isSubRouterAlive: true
            };
        },
        methods: {
            ...mapActions(['getInitDataAction']),
            initData() {
                this.getInitDataAction();
            },
            refresh() {
                this.isSubRouterAlive = false;
                this.$nextTick(() => {
                    this.isSubRouterAlive = true;
                });
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
                min-width: 200px;
                width: 200px;
            }
            .right-content {
                flex: 1;
            }
        }
    }
</style>
