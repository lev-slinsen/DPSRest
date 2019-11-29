import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {submitOrder, fetchOrders} from "../../Redux/productsReducer";
import OrderForm from "../../common/FormControls/FormsControls";
import style from './Order.module.css';
import {getTotalQuantity} from "../../Redux/selectors";
import {AppStateType} from "../../Redux/Store";

interface IProps {
    totalQuantity: number
    submitOrder: (formData: any) => void
    fetchOrders: () => void
}

const Order = ({totalQuantity, submitOrder, fetchOrders}: IProps) => {

    useEffect(fetchOrders, []);

    const onSubmit = (formData: any) => {
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

const mapStateToProps = (state: AppStateType) => {
    return {
        totalQuantity: getTotalQuantity(state)
    }
};

export default compose(
    connect(mapStateToProps, {submitOrder, fetchOrders})
)(Order);
