import React, {Component} from 'react';
import {fetchOrders} from "../../Redux/productsReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import style from './About.module.css';
import {AppStateType} from "../../Redux/Store";
import axios from "axios";
import {I_filterItem, I_productItem} from "../../types/types";
import Slider from "../../common/Slider";
import bgPict from "../../assets/images/slide1.png";
// @ts-ignore
import {Fade} from "react-reveal";


interface IProps {
    filters: Array<I_filterItem>,
    pizzas: Array<I_productItem>
}

interface IState {
    imageLoaded: boolean
    order: any
}

interface I_dispatchProps {
    fetchOrders: () => void
}

let commonCarusel = {
    index: {
        "front_image": [
            {"image": bgPict},
            {"image": bgPict},
            {"image": bgPict}
        ],
        front_text: [
            {text: "carousel asdasdasd image 1"},
            {text: "Общество с ограниченной ответственностью «Печь Орин» image 2"},
            {text: "Общество с ограниченной ответственностью «Печь Орин» image 3"}
        ]
    }
};

class About extends Component<IProps & I_dispatchProps & IState> {
    state: IState = {
        imageLoaded: false,
        order: {
            phone: '222333111',
            first_name: 'string',
            delivery_date: '2000-10-21',
            delivery_time: 2,
            address: 'string',
            comment: 'string',
            payment: 0,
            order_items: [
                {
                    quantity: 3,
                    pizza: 1,
                }, {
                    quantity: 2,
                    pizza: 2,
                }
            ]
        }
    };

    postOrder = () => {
        console.log(this.state.order);
        axios.post("http://127.0.0.1:8000/api/order/", this.state.order)
            .then(res => {
                alert(res.request)
            })
            .catch(err => {
                alert(err)
            })

    };

    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }

    render() {

        return (
            <div>
                <Slider
                    commonImages={commonCarusel.index.front_image}
                    commonTexts={commonCarusel.index.front_text}
                />
                <div className={style.aboutWrapper}>
                    <Fade cascade>
                        <div className={style.row}>
                            <div className={style.col5}>
                                <img src={'https://pechorin.by/media/hardcode/about/5.jpg'}/>
                            </div>
                            <div className={style.col7}>
                                <h3>О сервисе</h3>
                                <article>Мы работаем с понедельника по пятницу, по рабочим дням. Заказы сегодня на
                                    сегодня принимаются только по телефону до 12-30. Время для приготовления и доставки
                                    занимает от 1,5 часов, и зависит от величины заказа и района доставки. Если Вам
                                    нужно приготовить большой заказ или важно время доставки, пожалуйста, сделайте заказ
                                    заранее.
                                </article>
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.col5}>
                                <img src={'https://pechorin.by/media/hardcode/about/5.jpg'}/>
                            </div>
                            <div className={style.col7}>
                                <div className={style.container}>
                                    <h3>О сервисе</h3>

                                    <article>Мы работаем с понедельника по пятницу, по рабочим дням. Заказы сегодня на
                                        сегодня принимаются только по телефону до 12-30. Время для приготовления и
                                        доставки
                                        занимает от 1,5 часов, и зависит от величины заказа и района доставки. Если Вам
                                        нужно приготовить большой заказ или важно время доставки, пожалуйста, сделайте
                                        заказ
                                        заранее.
                                    </article>
                                </div>
                            </div>
                        </div>
                    </Fade>
                    <div>

                    </div>
                </div>
                <button onClick={this.postOrder}>post test order</button>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        filters: state.reducer.filters,
        pizzas: state.reducer.products
    }
};

export default compose(connect(mapStateToProps, {fetchOrders}))(About);