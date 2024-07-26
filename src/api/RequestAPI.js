import axiosClient from './AxiosClient';

const RequestAPI = {
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

    getRequests() {
        return axiosClient.get(`/v1/request-promotions`);
    },
};

export default RequestAPI;