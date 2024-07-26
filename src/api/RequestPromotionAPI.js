import axiosClient from './AxiosClient';

const RequestPromotionAPI = {
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

    getAll() {
        return axiosClient.get(`/v1/request-promotions`);
    },

    getById(id) {

    },

    create(data) {
        return axiosClient.post('/v1/request-promotion/create', data);
    }
};

export default RequestPromotionAPI;