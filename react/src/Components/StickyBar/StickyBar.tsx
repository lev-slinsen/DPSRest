import React, {Component} from 'react';
import style from './StickyBar.module.css';
// @ts-ignore
import {Fade} from "react-reveal";
import menuBtn from './../../assets/icons/menu-button.png'
import {NavLink} from "react-router-dom";
import CartBtn from "../Header/CartBtn";

class StickyBar extends Component {

    state = {
        opened: false,
        prevScrollpos: window.pageYOffset,
        visible: true
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    hideMenu = () => {
        this.setState({opened: !this.state.opened})
    };

    handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = 400 < currentScrollPos;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible
        });
    };

    render() {
        let classNameForNavBlock = this.state.opened ? style.navButtonsBlockDisplay : style.navButtonsBlock;
        return (

            <div className={style.navButton}>
                <div>
                    <Fade right big when={this.state.visible}>
                        <NavLink to="home" onClick={this.hideMenu}>
                            <CartBtn totalQuantity={2} totalPrice={2}/>
                        </NavLink>
                        <button className={style.btnMenu} onClick={this.hideMenu}>
                            <img alt="menu" src={menuBtn}/>
                        </button>
                    </Fade>
                    <div>
                        <Fade right big cascade when={this.state.opened}>
                            <div className={classNameForNavBlock}>
                                <NavLink to="home"
                                         onClick={this.hideMenu}
                                         className={style.btn}>HOME
                                </NavLink>
                                <NavLink to="about"
                                         onClick={this.hideMenu}
                                         className={style.btn}>ABOUT
                                </NavLink>
                                <NavLink to="contacts"
                                         onClick={this.hideMenu}
                                         className={style.btn}>CONTACTS
                                </NavLink>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>

        )

    }
}

export default StickyBar;