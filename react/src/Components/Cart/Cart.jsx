import React from 'react';
import style from './Cart.module.css';
import {compose} from "redux";
import {connect} from "react-redux";
import {calculateOrder, decreaseQuantity, increaseQuantity, removeFromOrder} from "../../Redux/pizzasReducer.ts";
import {NavLink} from "react-router-dom";


const Cart = ({order, decreaseQuantity, increaseQuantity, removeFromOrder, calculateOrder}) => {

    let orderItems = order.map(i => <CartItem
        pizza={i}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        removeFromOrder={removeFromOrder}
    />);

    return (
        <div>
            <div className={style.tableRow}>
                <h3>Items in your CART</h3>
            </div>
            <div className={style.cartWrapper}>
                {orderItems}
            </div>
            <div className={style.rowBetween}>
                <NavLink to="/catalog">
                    <button className={style.buttonMain}>
                        To Menu
                    </button>
                </NavLink>
                <NavLink to="/order">
                    <button className={style.buttonMain}>
                        Order
                    </button>
                </NavLink>
            </div>
        </div>
    )
};

const CartItem = ({pizza, decreaseQuantity, increaseQuantity, removeFromOrder}) => {
    return (

        <div className={style.tableRow}>
            <div className={style.row}>
                <div className={style.mainImg}>
                    <img src={pizza.photo_thumbnail}/>
                </div>

            </div>
            <div className={style.row}>
                <div className={style.description}>
                    <h6>{pizza.name}</h6>
                    <span>{pizza.size}</span>
                </div>
                <div className={style.description}>
                    <span>{pizza.text_short}</span>
                    <span>Вес 500гр</span>
                </div>
            </div>

            <div className={style.rowCalc}>
                <div className={style.col}>
                    <button
                        onClick={() => {
                            increaseQuantity(pizza.id)
                        }}
                        className={style.btnSmall}
                    >+
                    </button>
                    <span><b>{pizza.quantity}</b></span>
                    <button
                        onClick={() => {
                            decreaseQuantity(pizza.id)
                        }}
                        className={style.btnSmallMinus}
                    >-
                    </button>
                </div>
                <div className={style.calculator}>
                    <span>{(pizza.price * pizza.quantity).toFixed(2)}</span>
                    <span><b>BYN</b></span>

                </div>
            </div>
            <button
                onClick={() => {
                    removeFromOrder(pizza.id)
                }}
                className={style.btnSmallClose}
            >X
            </button>
        </div>

    )
};

const mapStateToProps = (state) => {
    return {
        order: state.reducer.order,
        totalQuantity: state.reducer.totalQuantity,
        totalPrice: state.reducer.totalPrice,
    }
};

export default compose(
    connect(mapStateToProps, {increaseQuantity, decreaseQuantity, removeFromOrder, calculateOrder})
)(Cart);
