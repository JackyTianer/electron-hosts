import Vue from 'vue';
import Router from 'vue-router';
import hostRouter from './host';

Vue.use(Router);

export default new Router({
    routes: [
        ...hostRouter,
        {
            path: '/',
            name: 'landing-page',
            component: require('@/components/LandingPage').default
        }
    ]
});
