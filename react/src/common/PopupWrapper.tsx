import React, {useState} from 'react';
import Preloader from "./Preloader";
import {IProductItem} from "../types/types";
import style from './PopupWrapper.module.css';

interface IProps {
    product: IProductItem
    setPopupClose: () => void
}

const PopupWrapper = ({product, setPopupClose}:IProps) => {

    let [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    return (
        <div onClick={setPopupClose} className={style.popupWrapper}>
            <div className={style.productCardWrapper}>
                <div className={style.header}>
                    <h4>{product.name}</h4>
                    <button className={style.btnClose}>X</button>
                </div>

                <div className={style.mainImg}>
                    {!imageLoaded &&
                    <Preloader/>
                    }
                    <img src={product.photo} onLoad={handleImageLoaded} alt={product.text_short}/>
                </div>
                <div className={style.container}>
                    <h5>{product.name}</h5>
                </div>
                <div className={style.rowDiscr}>
                    <span>{product.text_short}</span>
                </div>
                <div className={style.row}>
                    <article>{product.text_long}</article>
                </div>
            </div>
        </div>
    );
};

export default PopupWrapper
