import AdminLayout from '~/components/Layouts/AdminLayout';
import AdDashboard from '~/pages/AdDashboard';
import AdPromotion from '~/pages/AdPromotion';
import ForgotPassword from '~/pages/ForgotPassword';
import Home from '~/pages/Home';
import ReturnPolicy from '~/pages/ReturnPolicy';
import SignInSide from '~/pages/SignInSide';
import SignUp from '~/pages/SignUp';
import Orders from '~/pages/Orders';
import GoldPrice from '~/pages/GoldPrice';
import OrderDetailPage from '~/pages/OrderDetailPage';
import AdCounter from '~/pages/AdCounter';
import AdProduct from '~/pages/AdProduct';
import AdAccount from '~/pages/AdAccount';
import AdRequest from '~/pages/AdRequest';

const publicRoutes = [
    { path: '/', component: AdDashboard, layout: AdminLayout },
    { path: '/admin/dashboard', component: AdDashboard, layout: AdminLayout },
    { path: '/admin/promotions', component: AdPromotion, layout: AdminLayout },
    { path: '/admin/counter', component: AdCounter, layout: AdminLayout },
    { path: '/admin/account', component: AdAccount, layout: AdminLayout },
    { path: '/admin/product', component: AdProduct, layout: AdminLayout },
    { path: '/admin/request', component: AdRequest, layout: AdminLayout },
    { path: '/admin/return-policy', component: ReturnPolicy, layout: AdminLayout },
    { path: '/admin/gold-price', component: GoldPrice, layout: AdminLayout },
    { path: '/sign-in', component: SignInSide, layout: null },
    { path: '/sign-up', component: SignUp, layout: null },
    { path: '/forgot-password', component: ForgotPassword, layout: null },

    { path: '/admin/orders', component: Orders, layout: AdminLayout },
    { path: '/admin/orders/:orderId', component: OrderDetailPage, layout: AdminLayout },

];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
