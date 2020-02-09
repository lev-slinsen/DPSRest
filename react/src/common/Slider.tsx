import React from 'react';
import {Carousel} from "antd";
import 'antd/dist/antd.css'
import './antdComponents.css'

interface I_props {
    commonImages: Array<{ image_name?: string, image: string }>
    commonTexts: Array<{ text_name?: string, text: string }>
}

let Slider = ({commonImages, commonTexts}: I_props) => {

    let items = commonImages.map((item, index) => {
        return (
            <div key={item.image_name ? item.image_name : 'carousel'+index }>
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
        <Carousel effect="scrollx" autoplay>
            {items}
        </Carousel>
    )
};

export default Slider;