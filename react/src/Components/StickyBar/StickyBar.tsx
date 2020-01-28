import React, {Component, useEffect, useState} from 'react';
import style from './StickyBar.module.css';
// @ts-ignore
import {Fade} from "react-reveal";
import menuBtn from './../../assets/icons/menu-button.png'
import {NavLink} from "react-router-dom";
import CartBtn from "../Header/CartBtn";



const StickyBar: React.FC = () => {
    let [opened, setOpened] = useState(false);
    let [visible, setVisible] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    },[]);

    const hideMenu = () => {
        setOpened(false)
    };

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = 400 < currentScrollPos;

        setVisible(visible);
    };

    let classNameForNavBlock = opened ? style.navButtonsBlockDisplay : style.navButtonsBlock;

    return (

            <div className={style.navButton}>
                <div>
                    <Fade right big when={visible}>
                        <div onClick={hideMenu} >
                        <CartBtn totalQuantity={2} totalPrice={2}/>
                        </div>
                        <button className={style.btnMenu} onClick={() => { setOpened(!opened) }}>
                            <img alt="menu" src={menuBtn}/>
                        </button>
                    </Fade>
                    <div>
                        <Fade right big cascade when={opened}>
                            <div className={classNameForNavBlock}>
                                <NavLink to="catalog"
                                         onClick={hideMenu}
                                         className={style.btn}>HOME
                                </NavLink>
                                <NavLink to="about"
                                         onClick={hideMenu}
                                         className={style.btn}>ABOUT
                                </NavLink>
                                <NavLink to="contacts"
                                         onClick={hideMenu}
                                         className={style.btn}>CONTACTS
                                </NavLink>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>

        )


}

export default StickyBar;