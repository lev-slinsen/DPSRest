import React, {Component} from 'react';
import style from './PizzaItem.module.css';
import ico from './../../assets/icons/favicon.png'

class PizzaImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false,
        }
    }

    handleImageLoaded = () => {
        this.setState({imageLoaded: true});
    };

    render() {

        return (
            <div className={style.mainImg} onClick={this.props.openPopup}>
                {this.state.imageLoaded &&<div>
                    <img src={this.props.imgThumbnail}/>
                </div>}

                <img src={this.props.imgUrl} onLoad={this.handleImageLoaded.bind(this)}/>
            </div>
        );
    }
}

export default PizzaImage;
