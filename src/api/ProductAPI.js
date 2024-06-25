import axiosClient from './AxiosClient';
const ProductAPI = {
    getAllActive() {
        return axiosClient.get(`/v1/product/product-active`);
    },
};

export default ProductAPI;
