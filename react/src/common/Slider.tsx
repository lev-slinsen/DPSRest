import React, {useState} from 'react';
import {Carousel} from "antd";
import 'antd/dist/antd.css'
import './antdComponents.css'
import Preloader from "./Preloader";
import slide from "../assets/images/slide1.png";


interface I_props {
    commonImages: Array<{ image_name?: string, image: string }>
    commonTexts: Array<{ text_name?: string, text: string }>
}

let Slider = ({commonImages, commonTexts}: I_props) => {
    let [imageLoaded, handleImageLoaded] = useState(false);

    let items = commonImages.map((item, index) => {
        return (
            <div>
                {/*{!imageLoaded && <Preloader/>}*/}
                {/*<img src={slide} onLoad={() => {handleImageLoaded(true)}} alt={"Pechorin Bulki"}/>*/}
                <div style={{
                    backgroundImage: `url(http://127.0.0.1:8000${item.image})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    height: `35rem`,
                    backgroundSize: 'cover',
                }} className="caruselContent">
                        <h3>
                            {commonTexts[index].text}
                        </h3>
                </div>
            </div>
        )
    });
    return (
        <Carousel autoplay effect="fade">
            {items}
        </Carousel>
    )
};

export default Slider;