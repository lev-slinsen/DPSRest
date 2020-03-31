import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import style from './Order.module.css';
import {getOrder, getOrderDates, getTotalQuantity} from "../../Redux/selectors";
import {AppStateType} from "../../Redux/Store";
import OrderForm from "../../common/FormControls/OrderForm";
import {I_orderDates, I_orderFormData, I_orderItem} from "../../types/types";
import {fetchOrderInfo, submitOrder} from "../../Redux/actions";
import {OrderModal} from "../../common/PopupWrapper";

interface I_Props {
    totalQuantity: number
    submitOrder: (formData: I_orderFormData) => void
    fetchOrderInfo: () => void
    orderDisabled: I_orderDates[]
    order: Array<I_orderItem>
}

const Order = ({totalQuantity, submitOrder, fetchOrderInfo, orderDisabled, order}: I_Props) => {
    let [isPopUpOpen, setPopUpOpen] = useState(false);

    useEffect(() => { fetchOrderInfo() }, []);

    const onSubmit = (formData: I_orderFormData) => {
        submitOrder(formData);
    };
    if (totalQuantity <= 0) {
        return <Redirect to={`/catalog`}/>
    } else
        return (
            <div className={style.pageWrapper}>
                { isPopUpOpen && <OrderModal title={"success"} orderItems={order}/> }
                <div className={style.title}>
                    <h3>Подтвердить заказ</h3>
                    <hr />
                </div>
                <div className={style.container}>
                    <span className={style.titleLabel}>Поля отмеченные * обязательны для заполнения</span>
                    <OrderForm onSubmit={onSubmit} orderDisabled={orderDisabled}/>
                </div>
            </div>
        );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        totalQuantity: getTotalQuantity(state),
        orderDisabled: getOrderDates(state),
        order: getOrder(state)
    }
};

export default compose(
    connect(mapStateToProps, {submitOrder, fetchOrderInfo})
)(Order);
