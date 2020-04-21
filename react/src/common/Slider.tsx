import React from 'react';
import {Carousel} from "antd";
import 'antd/dist/antd.css'
import './antdComponents.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

interface I_props {
    commonImages: Array<{ image_name?: string, image: string }>
    commonTexts: Array<{ text_name?: string, text: string }>
}

let Slider = ({commonImages, commonTexts}: I_props) => {

    let items = commonImages.map((item, index) => {
        return (
            <div key={item.image_name ? item.image_name : 'catousel'+index }>
                <div style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    height: `32rem`,
                    backgroundSize: 'cover',
                    display:"flex",
                    justifyContent:"space-between"
                }} className="caruselContent">
                </div>
            </div>
        )
    });
    return (
        <Carousel arrows={true} autoplay effect="fade"
                  prevArrow={<FontAwesomeIcon icon={faChevronLeft}/>}
                  nextArrow={<FontAwesomeIcon icon={faChevronRight}/>}>
            {items}
        </Carousel>
    )
};

export default Slider;
