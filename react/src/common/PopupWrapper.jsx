import React, {Component} from 'react';
import style from './PopupWrapper.module.css'
import Preloader from "./Preloader";

class PopupWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: '',
        }
    }

    handleImageLoaded() {
        this.setState({image: 'loaded'});
    }

    render() {

        const {pizza, title} = this.props;
        return (
            <div onClick={this.props.setPopupOpen} className={style.popupWrapper}>
                <div className={style.pizzaCardWrapper}>
                    <div className={style.header}>
                        <h4>{pizza.name}</h4>
                        <button className={style.btnClose}>X</button>
                    </div>

                    <div className={style.mainImg}>
                        {!this.state.image &&
                        <Preloader/>
                        }
                        <img src={pizza.photo} onLoad={this.handleImageLoaded.bind(this)}/>
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
    }
}

export default PopupWrapper
