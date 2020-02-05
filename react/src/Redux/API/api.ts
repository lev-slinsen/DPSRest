import axios from "axios";
import {I_orderDates, I_orderFormData, I_orderToPost, I_postOrderItem} from "../../types/types";
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
    async postOrder(formData: I_orderFormData, order: Array<I_postOrderItem>) {
        let payload = {
            ...formData,
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

    getOrderData():Promise<Array<I_orderDates>> {
        return instance.get(`work-month/`)
            .then(res => {
                if (res.status === 200) {
                    return res.data
                }
            })
            .catch((err) => {
                throw err;
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

export const paymentAPI = {
    getToken() {
        return axios.get('https://checkout.bepaid.by/ctp/api/checkouts',
            {withCredentials: true,
                headers: [
                {'Content-Type': 'application/json'},
                {'Accept': 'application/json'},
                ]
            })
            .then( res => {
                debugger;
                console.log(res)
            })
            .catch( err => {
                debugger;
                console.log(err)
            })
    },
}