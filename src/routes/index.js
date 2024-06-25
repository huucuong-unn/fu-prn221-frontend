import AdminLayout from '~/components/Layouts/AdminLayout';
import AdDashboard from '~/pages/AdDashboard';
import AdPromotion from '~/pages/AdPromotion';
import ForgotPassword from '~/pages/ForgotPassword';
import Home from '~/pages/Home';
import ReturnPolicy from '~/pages/ReturnPolicy';
import SignInSide from '~/pages/SignInSide';
import SignUp from '~/pages/SignUp';
import Orders from '~/pages/Orders';

const publicRoutes = [
    { path: '/', component: Home, layout: AdminLayout },
    { path: '/admin/dashboard', component: AdDashboard, layout: AdminLayout },
    { path: '/admin/promotions', component: AdPromotion, layout: AdminLayout },
    { path: '/sign-in', component: SignInSide, layout: null },
    { path: '/sign-up', component: SignUp, layout: null },
    { path: '/forgot-password', component: ForgotPassword, layout: null },
    { path: '/return-policy', component: ReturnPolicy, layout: AdminLayout },

    { path: '/orders', component: Orders, layout: AdminLayout },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
