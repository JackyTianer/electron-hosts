<template>
    <div class="u-host-sidebar">
        <ul class="" v-for="g in hostGroups" :key="g.id">
            <li v-for="h in g.hosts" :key="h.id">
                {{h.name}}
            </li>
        </ul>
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
        }
    };
</script>

<style lang="scss" scoped>

</style>
