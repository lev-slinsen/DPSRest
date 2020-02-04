import axios from "axios";
import {I_postOrderItem} from "../../types/types";
import {testFilters, testPissas} from "./TestApi";
import {APIerrorLogger} from "../../utils/errorLogger";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

export const productsAPI = {
    getProducts() {
        return instance.get('pizza/?format=json')
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                }
            })
            .catch(() => {
                return testPissas;
            })
    },
    getFilters() {
        return instance.get(`filter/?format=json`)
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                }
            })
            .catch(() => {
                return testFilters;
            })
    },
    async postOrder(formData: any, order: Array<I_postOrderItem>) {
        let payload = {
            ...formData,
            phone: +formData.phone,
            delivery_time: +formData.delivery_time,
            payment: +formData.payment,
            order_items: order
        };
        console.log(payload);
        try {
            let res = await instance.post(`order/`, payload);
            return res.statusText
        } catch (err) {
            if (err.response.status === 400) {
                throw new Error(err.response.data.non_field_errors[0])
            }
            APIerrorLogger(err);
            console.log( JSON.parse(JSON.stringify(err)) );

        }
    },

    getOrders() {
        return instance.get('order/?format=json')
            .then(res => {
                if (res.status === 200) {
                    return res.data
                }
            })
            .catch(() => {
                return testFilters;
            })
    },
};
export const languageDataAPI = {
    async getLanguageData() {
        try {
            let res = await instance.get('front-page/');
            return res.data
        } catch (err) {
            APIerrorLogger(err);
            console.log(err);
            throw err
        }
    },
};