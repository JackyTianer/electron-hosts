<template>
    <div class="u-host-header">
        <el-button icon="el-icon-plus" size="mini"></el-button>
        <el-button icon="el-icon-minus" size="mini"></el-button>
        <el-button icon="el-icon-check" size="mini"></el-button>
    </div>
</template>

<script>
    export default {
        name: 'HostsHeader'
    };
</script>

<style lang="scss" scoped>
    .u-host-header {
        background: #fafafa;
        border-bottom: 1px solid #dcdfe6;
        left: 0;
        padding: 10px;
        position: fixed;
        top: 0;
        width: 100%;
    }
</style>
