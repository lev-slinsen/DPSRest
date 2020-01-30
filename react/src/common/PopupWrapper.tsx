import React, {useState} from 'react';
import Preloader from "./Preloader";
import {I_productItem} from "../types/types";
import style from './PopupWrapper.module.css';
import {Button, Modal} from "antd";

interface I_Props {
    product: I_productItem
    setPopupClose: () => void
}

export const ProductsModal = ({product, setPopupClose}: I_Props) => {

    let [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    return (
        <Modal
            title={product.name}
            visible={true}
            onOk={setPopupClose}
            onCancel={setPopupClose}
            footer={[]}
        >
            <div className={style.mainImg}>
                {!imageLoaded &&
                <Preloader/>
                }
                <img src={product.photo} onLoad={handleImageLoaded} alt={product.text_short}/>
            </div>
            <div className={style.row}>
                <h5>{product.name}</h5>
            </div>
            <hr/>
            <div className={style.row}>
                <span>{product.text_short}</span>
            </div>
            <hr/>
            <div className={style.row}>
                <article>{product.text_long}</article>
            </div>
        </Modal>
    )
};


export const OrderModal = ({handleOk, handleCancel, loading}:any) => {

    let [visible, setVisible] = useState(false);
    const handleImageLoaded = () => {
        setVisible(true);
    };

    return (
        <Modal
            visible={visible}
            title="Title"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Submit
                </Button>,
            ]}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
};
