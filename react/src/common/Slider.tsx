import React from 'react';
import {Carousel} from "antd";
import 'antd/dist/antd.css'
import './antdComponents.css'


interface I_props {
    commonImages: Array<{ image_name: string, image: string }>
}

let Slider = ({commonImages}: I_props) => {
    let items = commonImages.map((i) => {
        return (
            <div>
                <div style={{
                    backgroundImage: `url(${i.image})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    height: `35rem`,
                    backgroundSize: 'cover',
                }} className="caruselContent">

                        <h3>
                            {i.image_name}
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