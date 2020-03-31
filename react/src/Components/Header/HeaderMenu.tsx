import React, {useState} from 'react';
import style from './Header.module.css';
import {NavLink} from 'react-router-dom';


interface IProps {
    setVisible?: (param:boolean) => void
}

function HeaderMenu({setVisible}: IProps) {
    return (
        <div className={style.headerIn}>
            <div className={style.menu}>
                <NavLink onClick={()=>setVisible?.(false)} to="/catalog" activeClassName={style.active}>
                    Меню
                </NavLink>
                <NavLink onClick={()=>setVisible?.(false)} to="/about" activeClassName={style.active}>
                    О нас
                </NavLink>
                <NavLink onClick={()=>setVisible?.(false)} to="/order" activeClassName={style.active}>
                    Закзать
                </NavLink>
            </div>
            <div className={style.info}>
                <span className={style.bold}>Мы работаем с пн.-пт. с 8 до 19.00</span>
                <span>+375 (33) 658-02-20</span>
            </div>
        </div>
    );
}

export default HeaderMenu;
