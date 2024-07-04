import axiosClient from './AxiosClient';
const CustomerAPI = {
    getByPhone(phone) {
        const url = `/v1/customer/phone?phone=${phone}`;
        return axiosClient.get(url);
    },

};

export default CustomerAPI;
