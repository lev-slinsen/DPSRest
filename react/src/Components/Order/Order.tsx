import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {submitOrder, fetchOrderInfo} from "../../Redux/productsReducer";
import style from './Order.module.css';
import {getOrderDates, getTotalQuantity} from "../../Redux/selectors";
import {AppStateType} from "../../Redux/Store";
import OrderForm from "../../common/FormControls/OrderForm";
import {I_orderDates, I_orderFormData} from "../../types/types";

interface I_Props {
    totalQuantity: number
    submitOrder: (formData: I_orderFormData) => void
    fetchOrderInfo: () => void
    orderDisabled: I_orderDates[]
}

const Order = ({totalQuantity, submitOrder, fetchOrderInfo, orderDisabled}: I_Props) => {

    useEffect(() => { fetchOrderInfo() }, []);

    const onSubmit = (formData: I_orderFormData) => {
        submitOrder(formData);
    };
    if (totalQuantity <= 0) {
        return <Redirect to={`/catalog`}/>
    } else
        return (
            <div className={style.pageWrapper}>
                <div>
                    <h3>Подтвердить заказ</h3>
                    <hr />
                </div>
                <div className={style.container}>
                    <span>Поля отмеченные * обязательны для заполнения</span>
                    <OrderForm onSubmit={onSubmit} orderDisabled={orderDisabled}/>
                </div>
            </div>
        );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        totalQuantity: getTotalQuantity(state),
        orderDisabled: getOrderDates(state)
    }
};

export default compose(
    connect(mapStateToProps, {submitOrder, fetchOrderInfo})
)(Order);
