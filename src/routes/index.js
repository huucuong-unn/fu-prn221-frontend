import DefaultLayout from '~/components/Layouts/DefaultLayout';
import Home from '~/pages/Home';

const publicRoutes = [{ path: '/', component: Home, layout: DefaultLayout }];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
