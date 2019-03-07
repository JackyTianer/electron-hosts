<template>
    <div class="m-host-content">
        <code-mirror :value="content" class="editor"
                     :options="options"
                     @input="onCmCodeChange"
        >
        </code-mirror>
    </div>
</template>

<script>
    import clientUtil from '../../common/utils/clientUtil';
    import CodeMirror from '../components/CodeMirror';

    // import util from '../../common/utils/util';

    export default {
        name: 'HostContent',
        props: {
            id: {
                type: Number
            }
        },
        components: {
            'code-mirror': CodeMirror
        },
        inject: ['refresh'],
        beforeRouteUpdate(to, from, next) {
            next();
            if (to.name === from.name) {
                this.refresh();
            }
        },
        data: () => ({
            content: '',
            options: {
                lineNumbers: true,
                mode: 'hosts'
            }
        }),
        mounted() {
            this.getContent();
        },
        methods: {
            async getContent() {
                this.content = await clientUtil.perform('getHostContentById', { id: this.id });
            },
            _writeFile(content) {
                clientUtil.perform('updateHostContentById', { content: content, id: this.id });
            },
            onCmCodeChange(content) {
                this._writeFile(content);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .m-host-content {
        .editor {
            height: 100%;
            /deep/ .CodeMirror {
                height: 100%;
            }
        }
    }
</style>
