import React from 'react';
import style from './Footer.module.css';
import belCard from "../../assets/icons/payment/belCard.png";
import bePaid from "../../assets/icons/payment/bePaid.png";
import maestro from "../../assets/icons/payment/maestro.png";
import masterCard from "../../assets/icons/payment/masterCard.png";
import mtbank from "../../assets/icons/payment/mtbank.png";
import visa from "../../assets/icons/payment/visa.png";
import {NavLink} from "react-router-dom";


const Footer = (props) => {

    let payments = [
        {title: 'belCard', logo: belCard},
        {title: 'bePaid', logo: bePaid},
        {title: 'maestro', logo: maestro},
        {title: 'masterCard', logo: masterCard},
        {title: 'mtbank', logo: mtbank},
        {title: 'visa', logo: visa}
    ].map(p => {
        return (
            <NavLink className={style.payment} key={p.title} to="/payment">
                <img src={p.logo} alt={p.title}/>
            </NavLink>
        )
    });

    return (
        <footer className={style.footerWrapper}>
            <div className={style.container}>
                <div className={style.containerRow}>
                    <div className={style.containerCol}>
                        <h4>
                            РЕКВИЗИТЫ КОМПАНИИ
                        </h4>
                        <p>Общество с ограниченной ответственностью «Печь Орин»</p>
                        <p>220035, г. Минск, ул. Бачило, д. 18</p>
                        <p>УНП 192810299</p>
                        <p>Регистрационный номер в ТР РБ: 402852</p>
                    </div>
                    <div className={style.containerCol}>
                        <h4>
                            КОНТАКТЫ
                        </h4>
                        <p>Телефон: +375 33 6580220</p>
                        <p>E-mail: info@pechorin.by</p>
                        <p>Сайт: <a href={'pechorin.by'}>pechorin.by</a></p>
                    </div>
                </div>
                <hr/>
                <div className={style.containerRow}>
                    {payments}
                </div>
                <hr/>
                <div className={style.container}>
                    <span>© 2019 Copyright: <a href={'pechorin.by'}>pechorin.by</a></span>
                </div>

            </div>
        </footer>
    )
};

export default Footer;