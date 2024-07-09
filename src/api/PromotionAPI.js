import axiosClient from './AxiosClient';

const PromotionAPI = {
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

    getAll(params) {
        const url = `/v1/promotion?page=${params.page}&size=${params.size}`;
        return axiosClient.get(url);
    },

    getAllForAdmin(params) {
        const url = `/v1/promotion/promotion-search?promotionName=${params.promotionName}&status=${params.status}&startDate=${params.startDate}&endDate=${params.endDate}&page=${params.page}&limit=${params.limit}`;
        return axiosClient.get(url);
    },

    createOrder(data, includeAuthorization = false) {
        return axiosClient.post('/v1/promotion/create', data);
    },

    changeStatus(id, includeAuthorization = false) {
        return axiosClient.delete(`/v1/promotion/change-status/${id}`);
    },
};

export default PromotionAPI;
