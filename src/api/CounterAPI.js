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

    update(id, data) {
        const url = `/v1/counter/update/${id}`;
        return axiosClient.put(url, data);
    },

    getById(id) {
        const url = '/v1/counter/' + id;
        return axiosClient.get(url);
    },
    changeStatus(id, includeAuthorization = false) {
        return axiosClient.delete(`/v1/counter/change-status/${id}`);
    },

};

export default CounterAPI;
