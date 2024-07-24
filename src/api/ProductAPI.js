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

    createProduct(data, includeAuthorization = false) {
        return axiosClient.post('/v1/product/create', data);
    },

    updateProductPrice(data, includeAuthorization = false) {
        const url = '/v1/product/update-price';
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.put(url, authorizedConfig);
    },
};

export default ProductAPI;
