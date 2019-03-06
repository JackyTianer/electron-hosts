<template>
    <div class="u-host-sidebar">
        <div v-for="g in hostGroups" :key="g.id">
            <h2 class="group-name">{{g.name}}</h2>
            <ul>
                <li class="host-name" v-for="h in g.hosts" :key="h.id" @click="goHostContent(h.id)">
                    <i class="el-icon-check"></i>
                    <span class="name">{{h.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HostsSidebar',
        props: {
            hostGroups: {
                type: Array,
                default: () => []
            }
        },
        // data() {
        //     return {
        //         crtId: undefined
        //     };
        // },
        // watch: {
        //     hostGroups: (newV) => {
        //         if (newV.length > 0) {
        //             debugger;
        //             // this.$router.push('host', {
        //             //     params: {
        //             //         id: newV[0].hosts[0].id
        //             //     }
        //             // });
        //         }
        //     }
        // },
        methods: {
            goHostContent(id) {
                debugger;
                this.$router.replace({
                    name: 'host',
                    params: {
                        id
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .u-host-sidebar {
        background: #dcdfe6;
        box-sizing: border-box;
        border-right: 1px solid #dcdfe6;
        padding: 15px 20px;
        .group-name {
            color: #303133;
            font-weight: bold;
        }
        .host-name {
            color: #909399;
            cursor: pointer;
            padding-left: 10px;
            .name {
                margin-left: 5px;
            }
            &:hover {
                background: #ebeef5;
            }
        }
    }
</style>
