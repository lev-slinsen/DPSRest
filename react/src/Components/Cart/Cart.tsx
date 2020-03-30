import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {I_orderItem} from "../../types/types";
import {getOrder, getTotalPrice, getTotalQuantity} from "../../Redux/selectors";
import {AppStateType} from "../../Redux/Store";
import style from './Cart.module.css';
import ButtonMain from "../../common/Buttons/ButtonMain";
import {decreaseQuantity, increaseQuantity, removeFromOrder} from "../../Redux/actions";

interface IConnectProps {
    order: Array<I_orderItem>,
    totalQuantity: number,
    totalPrice: number
}

interface IDispatchProps {
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;
    removeFromOrder: (id: string) => void;
}

interface ICartItemProps {
    product: I_orderItem,
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;
    removeFromOrder: (id: string) => void;
}

const Cart = ({order, decreaseQuantity, increaseQuantity, removeFromOrder, totalPrice, totalQuantity}: IDispatchProps & IConnectProps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    let tableItems = order.map(i => <tr style={{borderBottomColor: '#faad149c'}}>
            <TableItem key={i.id} product={i} decreaseQuantity={decreaseQuantity}
                       increaseQuantity={increaseQuantity} removeFromOrder={removeFromOrder}/>
        </tr>
    );
    return (
        <div className={style.cartWrapper}>
            <h2>В корзине товаров: {totalQuantity}</h2>
            <div className={style.cartTableWrapper}>
                <table className={style.cartTable}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Шт.</th>
                        <th>Сумма</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableItems}
                    </tbody>
                </table>
            </div>
            <div className={style.rowBetween}>
                <div className={style.col}>
                    <span>Доставка бесплатная!</span>
                    <span className={style.bold}>К оплате: {totalPrice} BYN</span>
                </div>
            </div>
            <div className={style.rowBetween}>
                <NavLink to="/catalog" className={style.btnToMenu}>
                    <ButtonMain buttonText={"В Меню"}/>
                </NavLink>

                <NavLink to="/order" className={style.btnOrder}>
                    <ButtonMain buttonText={"Заказать"}/>
                </NavLink>
            </div>
        </div>
    )
};

const TableItem = ({product, decreaseQuantity, increaseQuantity, removeFromOrder}: ICartItemProps) => {
    return (
        <>
            <td style={{width: '15%'}}>
                <div className={style.mainImg}>
                    <img src={product.photo_thumbnail} alt={product.text_short}/>
                </div>
            </td>

            <td>
                <div className={style.description}>
                    <h6>{product.name}</h6>
                    {/*<span>{product.size}</span>*/}
                </div>
            </td>
            <td>
                {product.price}
            </td>
            <td>
                <div className={style.col}>
                    <button
                        onClick={() => {
                            increaseQuantity(product.id)
                        }}
                        className={style.btnSmall}
                    >+
                    </button>
                    <span><b>{product.quantity}</b></span>
                    <button
                        onClick={() => {
                            decreaseQuantity(product.id)
                        }}
                        className={style.btnSmallMinus}
                    >-
                    </button>
                </div>
            </td>

            <td>
                <div className={style.col}>
                    <span>{(product.price * product.quantity).toFixed(2)}</span>
                    <span><b>BYN</b></span>
                    <button
                        onClick={() => {
                            removeFromOrder(product.id)
                        }}
                        className={style.btnSmallClose}>X
                    </button>
                </div>
            </td>
        </>

    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        order: getOrder(state),
        totalQuantity: getTotalQuantity(state),
        totalPrice: getTotalPrice(state),
    }
};

export default compose(
    connect(mapStateToProps, {increaseQuantity, decreaseQuantity, removeFromOrder})
)(Cart);
