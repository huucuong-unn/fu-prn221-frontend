import axiosClient from './AxiosClient';

const UserCounterAPI = {
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

    create(data) {
        const url = '/v1/user-counter/create';
        return axiosClient.post(url, data);
    },


};

export default UserCounterAPI;
