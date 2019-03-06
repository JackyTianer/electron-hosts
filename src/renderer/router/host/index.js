import HostContent from './HostContent.vue';
// 这里是组装router的地方
export default [
    {
        path: '/host/:id',
        name: 'host',
        component: HostContent,
        props: (route) => {
            const id = +route.params.id;
            return { id };
        }
    }
];
