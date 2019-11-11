import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

function CartBtn({totalQuantity, totalPrice}) {

    return (

        <div>
            <NavLink to="/cart" className={style.cartBtnWrapper}>
                <div className={style.cartName}>
                    <span>Корзина</span>
                </div>
                <div className={style.calculate}>
                    <span>{totalQuantity}</span>
                </div>
            </NavLink>
        </div>
    );
}

export default CartBtn;
