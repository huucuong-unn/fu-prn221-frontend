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

    changeStatus(params, includeAuthorization = false) {
        const url = '/v1/request-promotion/change-status';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },

    getRequests() {
        return axiosClient.get(`/v1/request-promotions`);
    },
};

export default RequestAPI;