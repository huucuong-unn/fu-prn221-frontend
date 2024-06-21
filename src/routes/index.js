import AdminLayout from '~/components/Layouts/AdminLayout';
import AdDashboard from '~/pages/AdDashboard';
import ForgotPassword from '~/pages/ForgotPassword';
import Home from '~/pages/Home';
import ReturnPolicy from '~/pages/ReturnPolicy';
import SignInSide from '~/pages/SignInSide';
import SignUp from '~/pages/SignUp';

const publicRoutes = [
    { path: '/', component: Home, layout: AdminLayout },
    { path: '/admin/dashboard', component: AdDashboard, layout: AdminLayout },
    { path: '/sign-in', component: SignInSide, layout: null },
    { path: '/sign-up', component: SignUp, layout: null },
    { path: '/forgot-password', component: ForgotPassword, layout: null },
    { path: '/return-policy', component: ReturnPolicy, layout: AdminLayout },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
