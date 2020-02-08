import React, {useState} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import style from './About.module.css';
import {AppStateType} from "../../Redux/Store";
import Slider from "../../common/Slider";
import bgPict from "../../assets/images/slide1.png";
// @ts-ignore
import {Fade} from "react-reveal";
import {Progress} from "antd";
import useRecursiveTimeout from "../../utils/useRecursiveTimeout";

interface I_Props {
    imageLoaded?: any
    order?: any
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


const About: React.FC<I_Props> = (props: any) => {
    let [progress, setProgress] = useState(0);
    let [progress2, setProgress2] = useState(0);
    let [progress3, setProgress3] = useState(0);
    let [hovered, setHovered] = useState(false);

        useRecursiveTimeout(
            () =>
                new Promise(r => {
                    setProgress(progress + 1);
                    r();
                }), 50)
        useRecursiveTimeout(
            () =>
                new Promise(r => {
                    setProgress2(progress2 + 1);
                    r();
                }), 70);
        useRecursiveTimeout(
            () =>
                new Promise(r => {
                    setProgress3(progress3 + 1);
                    r();
                }), 90);

    return (
        <div>
            <Slider
                commonImages={commonCarusel.index.front_image}
                commonTexts={commonCarusel.index.front_text}
            />

            <div className={style.aboutWrapper}>
                <h2>About</h2>
                <div style={{
                    backgroundImage: `url(${bgPict})`,
                }} className={style.parallaxImg}>

                    <Fade cascade>
                        <div className={style.row}>
                            <div className={style.col5}>
                                <img src={'https://pechorin.by/media/hardcode/about/5.jpg'}/>
                            </div>
                            <div className={style.col7}>
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
                        <div className={style.row}>
                            <div className={style.col5}>
                                <img src={'https://pechorin.by/media/hardcode/about/5.jpg'}/>
                            </div>
                            <div className={style.col7}>
                                <div className={style.container}>
                                    <h3>О сервисе</h3>

                                    <article>Мы работаем с понедельника по пятницу, по рабочим дням. Заказы сегодня
                                        на
                                        сегодня принимаются только по телефону до 12-30. Время для приготовления и
                                        доставки
                                        занимает от 1,5 часов, и зависит от величины заказа и района доставки. Если
                                        Вам
                                        нужно приготовить большой заказ или важно время доставки, пожалуйста,
                                        сделайте
                                        заказ
                                        заранее.
                                    </article>
                                </div>
                            </div>
                        </div>
                        <div className={style.rowPrax}>
                            <div>
                                <h1>Baked Pies</h1>
                                <Progress type="circle" percent={progress}/>
                            </div>
                            <div>
                                <h1>Cookies Eaten</h1>
                                <Progress type="circle" percent={progress2}/>
                            </div>
                            <div>
                                <h1>Happy Clients</h1>
                                <Progress type="circle" percent={progress3}/>
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.col5}>
                                <img src={'https://pechorin.by/media/hardcode/about/5.jpg'}/>
                            </div>
                            <div className={style.col7}>
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
                    </Fade>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state: AppStateType) => {
    return {
        filters: state.reducer.filters,
        pizzas: state.reducer.products
    }
};

export default compose(connect(mapStateToProps, {}))(About);