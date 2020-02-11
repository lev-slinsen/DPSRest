import React, { useEffect, useState } from 'react';
import style from './StickyBar.module.css';
// @ts-ignore
import {Fade} from "react-reveal";
import menuBtn from './../../assets/icons/menu-button.png'
import {NavLink} from "react-router-dom";
import CartBtn from "../Header/CartBtn";

interface I_Props {
    totalQuantity: number,
    totalPrice: number,
}

const StickyBar: React.FC<I_Props> = React.memo(({totalQuantity, totalPrice}:I_Props) => {
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
                        <CartBtn totalQuantity={totalQuantity} totalPrice={totalPrice}/>
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
});

export default StickyBar;