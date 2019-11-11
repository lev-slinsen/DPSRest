import React from 'react';
import style from './Cart.module.css';
import {compose} from "redux";
import {connect} from "react-redux";
import {calculateOrder, decreaseQuantity, increaseQuantity, removeFromOrder} from "../../Redux/pizzasReducer";
import {NavLink} from "react-router-dom";


const Cart = ({order, decreaseQuantity, increaseQuantity, removeFromOrder, calculateOrder}) => {

    let orderItems = order.map( i => <CartItem
        pizza={i}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        removeFromOrder={removeFromOrder}
    />);


    return (
        <div>
        <div className={style.cartWrapper}>
            {orderItems}
        </div>
            <div>
                <NavLink to="/catalog" activeClassName={style.button}>
                    <button className={style.item}>
                        To Menu
                    </button>
                </NavLink>
                <NavLink to="/order" activeClassName={style.button}>
                    <button className={style.item}>
                        Order
                    </button>
                </NavLink>
            </div>
        </div>
    )
};

const CartItem = ({pizza, decreaseQuantity, increaseQuantity, removeFromOrder}) => {
    return (
        <div>
            <hr />
    <div className={style.tableRow}>

        <div className={style.mainImg}><img src={pizza.photo}/></div>
        <div>{pizza.name}</div>
        <div>size: {pizza.size}</div>
        <div>FILTERS</div>
        <div>
            <span>short discription: {pizza.text_short}</span>
        </div>
        <div>
            <span>Вес 500гр</span>
        </div>
        <div>
            <div>
                <div>
                    <button onClick={()=>{decreaseQuantity(pizza.id)}}>-</button>
                    <span>{pizza.quantity}</span>
                    <button onClick={()=>{increaseQuantity(pizza.id)}}>+</button>
                </div>
                <div>
                    <span>{pizza.price*pizza.quantity}</span>
                    <span>BYN</span>
                </div>
            </div>
            <div>
                <button onClick={()=>{removeFromOrder(pizza.id)}}>X</button>
            </div>
        </div>
    </div>
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
    connect(mapStateToProps, { increaseQuantity, decreaseQuantity, removeFromOrder, calculateOrder})
)(Cart);
