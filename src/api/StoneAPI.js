import axiosClient from './AxiosClient';

const StoneAPI = {
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
        return axiosClient.get(`/v1/stone/without-paging`);
    },
};

export default StoneAPI;