<template>
    <div class="u-host-sidebar">
        <ul>
            <li class="host-name f-cb" v-for="h in hosts" :key="h.id" @click="goHostContent(h.id)">
                <el-checkbox :checked="isCheck(h.id)" @change="modifyCheckedHostIdList(h.id)"/>
                <span class="name">{{h.name}}</span>
                <i class="el-icon-delete oper-remove f-fr" @click.stop="removeHost(h)"></i>
                <i class="el-icon-edit oper-edit f-fr" @click.stop="editHostName(h)"></i>
            </li>
        </ul>
        <el-dialog title="编辑名称" :visible.sync="isShowEditDialog">
            <el-form :rules="rules" :model="crtHost" ref="formEl">
                <el-form-item prop="name">
                    <el-input v-model="crtHost.name" placeholder="请输入Host名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowEditDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateHostName">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { Notification } from 'element-ui';

    export default {
        name: 'HostsSidebar',
        props: {
            hosts: {
                type: Array,
                default: () => []
            },
            checkedHostIdList: {
                type: Array,
                default: () => []
            }
        },
        data: () => ({
            isShowEditDialog: false,
            crtHost: {},
            rules: {
                name: [
                    { required: true, message: '请输入Host名称', trigger: 'blur' }
                ]
            }
        }),
        methods: {
            ...mapActions(['modifyCheckedHostIdListAction', 'removeHostByIdAction', 'updateHostNameAction']),
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
            },
            removeHost({ id }) {
                this.removeHostByIdAction(id);
            },
            editHostName(host) {
                this.crtHost = Object.assign({}, host);
                this.isShowEditDialog = true;
            },
            updateHostName() {
                this.$refs.formEl.validate((valid) => {
                    if (valid) {
                        this.updateHostNameAction(this.crtHost);
                        Notification.success('更新成功');
                        this.isShowEditDialog = false;
                    } else {
                        return false;
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
        padding: 15px 0;
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
            .oper-remove, .oper-edit {
                display: none;
                cursor: pointer;
                line-height: 24px;
                margin-right: 2px;
                &:hover {
                    color: #409eff;
                }
            }
            &:hover {
                background: #ebeef5;
                .oper-remove, .oper-edit {
                    display: inline-block;
                }
            }
        }
    }
</style>
