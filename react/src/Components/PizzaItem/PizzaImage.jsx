import React, {Component} from 'react';
import style from './PizzaItem.module.css';
import ico from './../../assets/icons/favicon.png'

class PizzaImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
        }
    }

    handleImageLoaded = () => {
        this.setState({ image: 'loaded' });
    };
    render() {

        return (
                <div className={style.mainImg} onClick={this.props.openPopup}>
                    {this.state.image &&
                        <div ><img src={this.props.imgThumbnail}/></div>}
                    <img src={this.props.imgUrl} onLoad={this.handleImageLoaded.bind(this)}/>
                </div>
        );
    }
}

export default PizzaImage;
