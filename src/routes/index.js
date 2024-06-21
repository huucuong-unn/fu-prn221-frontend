import AdminLayout from '~/components/Layouts/AdminLayout';
import AdDashboard from '~/pages/AdDashboard';
import Home from '~/pages/Home';

const publicRoutes = [
    { path: '/', component: Home, layout: AdminLayout },
    { path: '/admin/dashboard', component: AdDashboard, layout: AdminLayout },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
