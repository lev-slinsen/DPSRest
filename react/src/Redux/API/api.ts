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
    getProducts () {
        return instance.get('pizza/?format=json')
            .then(res => {
                if(res.status === 200) {
                    return res.data;
                }
            })
            .catch( ()=> {
                return testPissas;
            })
    },
    getFilters () {
        return instance.get(`filter/?format=json`)
            .then(res => {
                if(res.status === 200) {
                    return res.data;
                }
            })
            .catch( ()=> {
                return testFilters;
            })
    },
    async postOrder (formData: any, order: Array<I_postOrderItem>) {
        let payload = {...formData, order_items: order};
        console.log(payload);
        try{
            let res = await instance.post(`order/`, payload);
            if (res.status >200 && res.status < 300) {
                return res.statusText
            } else {
                throw new Error('Some Error Occurred')
            }
        } catch (err) {
            APIerrorLogger(err);
            console.log(err)
        }
    },

    getOrders () {
        return instance.get('order/?format=json')
            .then(res => {
                if(res.status === 200) {
                    return res.data
                }
            })
            .catch(()=>{
                return testFilters;
            })
    },
};