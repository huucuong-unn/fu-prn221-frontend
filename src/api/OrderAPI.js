import axiosClient from './AxiosClient';
const OrderAPI = {
    createOrder(data, includeAuthorization = false) {
        return axiosClient.post('/v1/order/create', data);
    },

    getAll(params) {
        const url = `/v1/order?page=${params.page}&size=${params.size}`;
        return axiosClient.get(url);
    },
    getStatisticalOrderAndSalesAndProduct() {
        const url = `/v1/order/statistical-order-sales-product`;
        return axiosClient.get(url);
    },

    GetMonthlyOrderCount() {
        const url = `/v1/order/dashboard-bar-chart`;
        return axiosClient.get(url);
    },

    OrderDashboardForLineChart() {
        const url = `/v1/order/dashboard-line-chart`;
        return axiosClient.get(url);
    },

    GetTop5Customers() {
        const url = `/v1/order/top-5-customer`;
        return axiosClient.get(url);
    },

    GetProductTypeWithTotalOrder() {
        const url = `/v1/order/dashboard-pie-chart`;
        return axiosClient.get(url);
    },
    getOrderById(orderId) {
        const url = `/v1/order/${orderId}`;
        return axiosClient.get(url);
    },

    searchOrders(params) {
        const url = `/v1/order-search?page=${params.page}&size=${params.size}&orderCode=${params.orderCode}&startDate=${params.startDate}&endDate=${params.endDate}`;
        return axiosClient.get(url);
    },
};

export default OrderAPI;
