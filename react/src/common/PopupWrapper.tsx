import React, {useState} from 'react';
import Preloader from "./Preloader";
import {IPizzaItem} from "../types/types";
import style from './PopupWrapper.module.css';

interface IProps {
    pizza: IPizzaItem
    setPopupClose: () => void
}

const PopupWrapper = ({pizza, setPopupClose}:IProps) => {

    let [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    return (
        <div onClick={setPopupClose} className={style.popupWrapper}>
            <div className={style.pizzaCardWrapper}>
                <div className={style.header}>
                    <h4>{pizza.name}</h4>
                    <button className={style.btnClose}>X</button>
                </div>

                <div className={style.mainImg}>
                    {!imageLoaded &&
                    <Preloader/>
                    }
                    <img src={pizza.photo} onLoad={handleImageLoaded} alt={pizza.text_short}/>
                </div>
                <div className={style.container}>
                    <h5>{pizza.name}</h5>
                </div>
                <div className={style.rowDiscr}>
                    <span>{pizza.text_short}</span>
                </div>
                <div className={style.row}>
                    <article>{pizza.text_long}</article>
                </div>
            </div>
        </div>
    );
};

export default PopupWrapper
