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

    export default {
        name: 'HostContent',
        props: {
            id: {
                type: [Number, String]
            }
        },
        components: {
            'code-mirror': CodeMirror
        },
        data: () => ({
            content: '',
            options: {
                lineNumbers: true,
                // mode: 'javascript'
                mode: 'yaml'
            }
        }),
        async mounted() {
            this.content = await clientUtil.perform('getHostContentById', { id: this.id });
        },
        methods: {
            onCmCodeChange(content) {
                function debounce(fn, interval = 500) {
                    let timeout = null;
                    return function () {
                        clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            fn.apply(this, arguments);
                        }, interval);
                    };
                }

                debugger;
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
