<template>
    <div class="u-host-sidebar">
        <div v-for="g in hostGroups" :key="g.id">
            <h2 class="group-name">{{g.name}}</h2>
            <ul>
                <li class="host-name" v-for="h in g.hosts" :key="h.id" @click="goHostContent(h.id)">
                    <div v-if="!h.edit">
                        <el-checkbox :checked="isCheck(h.id)" @change="modifyCheckedHostIdList(h.id)"/>
                        <span class="name">{{h.name}}</span>
                    </div>
                    <div v-else>
                        <el-input :value="h.name" placeholder="" size="mini"></el-input>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'HostsSidebar',
        props: {
            hostGroups: {
                type: Array,
                default: () => []
            },
            checkedHostIdList: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            ...mapActions(['modifyCheckedHostIdListAction']),
            goHostContent(id) {
                this.$router.replace({
                    name: 'host',
                    params: {
                        id
                    }
                });
            },
            isCheck(id) {
                return this.checkedHostIdList.indexOf(id) !== -1;
            },
            modifyCheckedHostIdList(id) {
                this.modifyCheckedHostIdListAction(id);
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
            .el-checkbox {
                margin-right: 0;
            }
            &:hover {
                background: #ebeef5;
            }
        }
    }
</style>
