import axiosClient from './AxiosClient';
const ProductAPI = {
    getProductForMakeOrder() {
        return axiosClient.get(`/v1/product/product-for-order`);
    },
};

export default ProductAPI;
