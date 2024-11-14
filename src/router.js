import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './components/home/AppHome.vue';
import ListUsers from './components/users/ListUsers.vue';
//import GridUsers from './components/modals/GridUsers.vue';

// Define las rutas de la aplicación
const routes = [
    { path: '/', component: AppHome, name: 'app-home' },
    { path: '/users', component: ListUsers, name: 'list-users' },
    //{ path: '/grid', component: GridUsers, name: 'grid-users' },
];

// Crea y exporta el enrutador
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;