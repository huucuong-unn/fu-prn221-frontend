import axiosClient from './AxiosClient';
const AccountAPI = {
    getLoggedUser() {
        return axiosClient.get(`/v1/get-logged-user`);
    },

    login(data, includeAuthorization = false) {
        return axiosClient.post('/v1/login', data);
    },

    logout(data, includeAuthorization = false) {
        return axiosClient.post('/v1/logout');
    },
};

export default AccountAPI;
