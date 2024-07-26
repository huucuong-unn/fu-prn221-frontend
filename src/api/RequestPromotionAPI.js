import axiosClient from './AxiosClient';

const RequestPromotionAPI = {
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
        return axiosClient.get(`/v1/request-promotions`);
    },

    getById(id) {
        return axiosClient.get(`/v1/request-promotion/${id}`);
    },

    create(data) {
        return axiosClient.post(`/v1/request-promotion/create?customerId=${data.customerId}&productId=${data.productId}&quantity=${data.quantity}&description=${data.description}&status=${data.status}&staffId=${data.staffId}&createdDate=${data.createdDate}&updatedDate=${data.updatedDate}&counterId=${data.counterId}&createBy=${data.createBy}&updateBy=${data.updateBy}`);
    }
};

export default RequestPromotionAPI;