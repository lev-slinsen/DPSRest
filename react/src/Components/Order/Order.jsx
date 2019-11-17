import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {submitOrder, fetchOrders} from "../../Redux/pizzasReducer.ts";
import OrderForm from "./../../common/FormControls/FormsControls"
import style from './Order.module.css';

const Order = ({totalQuantity, submitOrder, fetchOrders}) => {
    useEffect(fetchOrders, []);
    const onSubmit = (formData) => {
        submitOrder(formData);
    };
    if (totalQuantity <= 0) {
        return <Redirect to={`/`}/>
    } else
        return (
            <div className={style.pageWrapper}>
                <h3>Подтвердить заказ</h3>


                <div className={style.container}>
                    <span>Поля отмеченные * обязательны для заполнения</span>
                    <OrderForm onSubmit={onSubmit}/>

                </div>
            </div>

        );
};

const mapStateToProps = (state) => {
    return {
        totalQuantity: state.reducer.totalQuantity
    }
};

export default compose(
    connect(mapStateToProps, {submitOrder, fetchOrders})
)(Order);
