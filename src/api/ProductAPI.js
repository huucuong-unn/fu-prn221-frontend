import axiosClient from './AxiosClient';

const ProductAPI = {
    addAuthorizationHeader(config, includeAuthorization) {
        if (includeAuthorization) {
            const token = JSON.parse(localStorage.getItem('accessToken'));
            config.headers = {
                Authorization: `Bearer ${token}`,
                ...config.headers,
            };
        }
        return config;
    },

    getProductForMakeOrder() {
        return axiosClient.get(`/v1/product/product-for-order`);
    },

    searchProduct(params, includeAuthorization = false) {
        const url = '/v1/product/searchsort';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};

export default ProductAPI;
