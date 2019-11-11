import React, {useEffect} from 'react';
import style from './Order.module.css';
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {submitOrder, fetchOrders} from "../../Redux/pizzasReducer";
import OrderForm from "./../../common/FormControls/FormsControls"

const Order = ({order, submitOrder, fetchOrders}) => {
    useEffect(fetchOrders,[]);
    const onSubmit = (formData) => {
        submitOrder(formData);
    };
    return (
        <div className={style.pageWrapper}>
            <h3>Подтвердить заказ</h3>

            {order ? <Redirect to={`/`}/>:
                <div className={style.container}>
                    <span>Поля отмеченные * обязательны для заполнения</span>
                    <OrderForm onSubmit={onSubmit}/>

                </div>}
        </div>
    );
};

const mapStateToProps = (state) => {
    return{

    }
};

export default compose(
    connect(mapStateToProps, {submitOrder, fetchOrders})
)(Order);
