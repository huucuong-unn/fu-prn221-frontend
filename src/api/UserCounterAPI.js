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


    changeUserCounterStatus(staffId, counterId, includeAuthorization = false) {
        return axiosClient.delete(`/v1/promotion/change-status/${staffId}/${counterId}`);
    },

    getByStaffId(staffId) {
        return axiosClient.get(`/v1/user-counter/staff/${staffId}`);
    }

};

export default UserCounterAPI;
