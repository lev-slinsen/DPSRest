import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {decreaseQuantity, increaseQuantity, removeFromOrder} from "../../Redux/productsReducer";
import {NavLink} from "react-router-dom";
import {I_orderItem} from "../../types/types";
import {getOrder, getTotalPrice, getTotalQuantity} from "../../Redux/selectors";
import {AppStateType} from "../../Redux/Store";
import style from './Cart.module.css';
import ButtonMain from "../../common/Buttons/ButtonMain";

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

    let orderItems = order.map(i => <CartItem
        key={i.id}
        product={i}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        removeFromOrder={removeFromOrder}
    />);

    return (
        <div className={style.cartWrapper}>
            <h2>В корзине товаров: {totalQuantity}</h2>

            <div className={style.container}>
                <div className={style.tableRow}>
                    <span> </span>
                    <span className={style.description}>Товар</span>
                    <span className={style.description}>Описание</span>
                    <span>шт.</span>
                    <span>Цена</span>
                </div>
                {orderItems}
            </div>

            <div className={style.rowBetween}>
                <div> </div>
                <div className={style.col}>
                    <span>Доставка бесплатная!</span>
                    <span>К оплате: {totalPrice} BYN</span>
                </div>
            </div>

            <div className={style.rowBetween}>
                <NavLink to="/catalog">
                    <ButtonMain buttonText={"В Меню"}/>
                </NavLink>

                <NavLink to="/order">
                    <ButtonMain buttonText={"Заказать"}/>
                </NavLink>

            </div>
        </div>
    )
};


const CartItem = ({product, decreaseQuantity, increaseQuantity, removeFromOrder}: ICartItemProps) => {
    return (
        <div className={style.tableRow}>

            <div className={style.row}>
                <div className={style.mainImg}>
                    <img src={product.photo_thumbnail} alt={product.text_short}/>
                </div>
            </div>

            <div className={style.description}>
                <h6>{product.name}</h6>
                <span>{product.size}</span>
            </div>

            <div className={style.description}>
                <span>{product.text_short}</span>
                <span>Вес 500гр</span>
            </div>

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

            <div className={style.col}>
                <span>{(product.price * product.quantity).toFixed(2)}</span>
                <span><b>BYN</b></span>
            </div>

            <button
                onClick={() => {
                    removeFromOrder(product.id)
                }}
                className={style.btnSmallClose}
            >X
            </button>
        </div>

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
