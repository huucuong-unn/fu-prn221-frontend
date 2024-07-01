import axiosClient from './AxiosClient';

const ProductTypeAPI = {
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

    getAllWithStatusActive(params, includeAuthorization = false) {
        const url = '/v1/product-type';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getAllWithStatusActiveWithoutPaging(includeAuthorization = false) {
        const url = '/v1/product-type-without-paging';
        const authorizedConfig = this.addAuthorizationHeader(includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};

export default ProductTypeAPI;
