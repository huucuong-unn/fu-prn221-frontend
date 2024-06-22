import axiosClient from './AxiosClient';
const AccountAPI = {
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

    createAccount(data, includeAuthorization = false) {
        return axiosClient.post('/v1/account/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    findAccountById(id) {
        return axiosClient.get(`/v1/account/${id}`);
    },

    login(data, includeAuthorization = false) {
        return axiosClient.post('/v1/login', data);
    },

    logout(data, includeAuthorization = false) {
        return axiosClient.post('/v1/logout');
    },
};

export default AccountAPI;
