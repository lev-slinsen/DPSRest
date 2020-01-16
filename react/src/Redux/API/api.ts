import axios from "axios";
import {I_postOrderItem} from "../../types/types";
import {testFilters, testPissas} from "./TestApi";

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
    postOrder: function (formData: any, order: Array<I_postOrderItem>) {
        let postData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            // @ts-ignore
            postData.set(key, value);
        });

        postData.append("order_items", JSON.stringify(order));
        // @ts-ignore
        for (var value of postData.values()) {
            console.log(value);
        }

        return instance.post(`order/`, {postData}, {withCredentials: true})
            .then(res => {
                debugger;
                return res
            })
            .catch(err => {
                debugger;
                console.log(err)
            })
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