import axiosClient from './AxiosClient';
const OrderAPI = {
    createOrder(data, includeAuthorization = false) {
        return axiosClient.post('/v1/order/create', data);
    },

    getAll(params) {
        const url = `/v1/order?page=${params.page}&size=${params.size}`;
        return axiosClient.get(url);
    },

    getOrderById(orderId) {
        const url = `/v1/order/${orderId}`;
        return axiosClient.get(url);
    },
};

export default OrderAPI;
