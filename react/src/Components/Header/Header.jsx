import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";
import CartBtn from "./CartBtn";
import logoImg from "./../../assets/icons/logo.svg"

function Header(props) {

    return (

        <header className={style.headerWrapper}>
            <NavLink to="/catalog">
                <div className={style.label}>
                    <img src={logoImg}/>
                </div>
            </NavLink>
            <div className={style.navContainer}>
                <NavLink to="/about" activeClassName={style.active}>
                    <div className={style.item}>
                        About
                    </div>
                </NavLink>
                <NavLink to="/wtf" activeClassName={style.active}>
                    <div className={style.item}>
                        wtf
                    </div>
                </NavLink>
                <NavLink to="/order" activeClassName={style.active}>
                    <div className={style.item}>
                        Order
                    </div>
                </NavLink>
            </div>
            <div className={style.inform}>
                <span>Мы работаем с пн.-пт. с 8 до 19.00</span>
                <span>+375 (33) 658-02-20</span>
            </div>
            <CartBtn {...props}/>
        </header>
    );
}

export default Header;
