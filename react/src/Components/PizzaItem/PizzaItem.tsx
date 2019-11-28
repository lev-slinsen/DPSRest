import React, {useState} from 'react';
import style from './PizzaItem.module.css';
import PizzaImage from "./PizzaImage";
import classNames from 'classnames/bind';
import {IPizzaItem} from "../../types/types";


interface IProps {
    pizza: IPizzaItem,
    addPizzaToOrder: (pizza: IPizzaItem, quantity: number) => void
    calculateOrder: () => void
    openPopup: () => void
}

const PizzaCard = ({pizza, addPizzaToOrder, calculateOrder, openPopup}: IProps) => {

    let [quantity, setQuantity] = useState(1);
    let [addSucces, setAddSucces] = useState(false);

    const decreaseQuantity = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1)
        }
    };

    const onAddToCart = () => {
        addPizzaToOrder(pizza, quantity);
        calculateOrder();
        setQuantity(1);
        setAddSucces(true);
        setTimeout(() => {
            setAddSucces(false);
        }, 500)
    };

    let cx = classNames.bind(style);
    let classNameForbtnAdd = cx(style.btnAdd, {
        success: addSucces
    });
    return (
        <div className={style.pizzaCardWrapper}>
            <PizzaImage
                imgUrl={pizza.photo}
                altText={pizza.text_short}
                openPopup={openPopup}
                imgThumbnail={pizza.photo_thumbnail}
            />
            <div className={style.container}>
                <h5>{pizza.name}</h5>
            </div>
            <div className={style.rowDiscr}>
                <span>{pizza.text_short}</span>
            </div>
            <div className={style.row}>
                <div className={style.calculator}>
                    <div className={style.row}>
                        <button className={style.btnSmallMinus} onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button className={style.btnSmall} onClick={() => {
                            setQuantity(quantity + 1)
                        }}>+
                        </button>
                    </div>
                    <div>
                        <span>{(pizza.price * quantity).toFixed(2)}</span>
                        <span style={{marginLeft: '5px'}}>BYN</span>
                    </div>
                </div>
                <div>
                    <button className={classNameForbtnAdd}
                            disabled={addSucces}
                            onClick={onAddToCart}
                    >Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    )
};

export default PizzaCard;