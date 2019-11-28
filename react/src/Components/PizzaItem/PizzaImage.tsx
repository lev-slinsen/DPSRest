import React, {useState} from 'react';
import style from './PizzaItem.module.css';

interface IProps {
    imgThumbnail: string
    openPopup: () => void
    imgUrl: string
    altText: string
}

const PizzaImage = ({imgThumbnail, altText, imgUrl, openPopup}: IProps) => {

    let [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoaded = () => {
        setImageLoaded(true);
    };
    return (
        <div className={style.mainImg} onClick={openPopup}>
            {!imageLoaded && <div>
                <img src={imgThumbnail} alt={altText}/>
            </div>}

            <img src={imgUrl} onLoad={handleImageLoaded} alt={altText}/>
        </div>
    );
};

export default PizzaImage;
