import axiosClient from './AxiosClient';

const CounterAPI = {
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

    getAllWithStatusActiveWithoutPaging(includeAuthorization = false) {
        const url = '/v1/counter-without-paging';
        const authorizedConfig = this.addAuthorizationHeader(includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};

export default CounterAPI;
