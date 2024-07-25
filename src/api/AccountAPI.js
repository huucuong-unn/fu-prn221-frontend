import axiosClient from './AxiosClient';

const AccountAPI = {
    getLoggedUser() {
        return axiosClient.get('/v1/get-logged-user');
    },

    login(data, includeAuthorization = false) {
        return axiosClient.post('/v1/login', data);
    },

    logout(data, includeAuthorization = false) {
        return axiosClient.post('/v1/logout', data);
    },

    getStaffData(params = { page: 1, size: 10 }) {
        const url = `/v1/staff`;
        return axiosClient.get(url, { params });
    },

    update(id, data) {
        const url = `/v1/user/update/${id}`;
        return axiosClient.put(url, data);
    },


    getUser(params = { page: 1, size: 10 }) {
        const url = `/v1/user`;
        return axiosClient.get(url, { params });
    },

    getCounterData() {
        const url = '/v1/counter-without-paging';
        return axiosClient.get(url);
    },

    getUserCounterData(params = { page: 1, size: 5 }) {
        const url = '/v1/user-counter';
        return axiosClient.get(url, { params });
    },

    getCounterById(id) {
        const url = `/v1/counter/${id}`;
        return axiosClient.get(url);
    },


    getUserCounterById(id) {
        const url = `/v1/user-counter/counter/${id}`;
        return axiosClient.get(url);
    },

    getStaffById(id) {
        const url = `/v1/user/${id}`;
        return axiosClient.get(url);
    },

    changeStatus(id, includeAuthorization = false) {
        return axiosClient.delete(`/v1/user/change-status/${id}`);
    },
};

export default AccountAPI;
