import React, {Component} from 'react';
import slide from "./../../assets/images/slide1.png"
import Preloader from "../../common/Preloader";
import {fetchOrders} from "../../Redux/productsReducer.js";
import {connect} from "react-redux";
import {compose} from "redux";
import style from './About.module.css';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false,
        }
    }
    componentDidMount() {
        if (!this.props.orders)
            this.props.fetchOrders();
    }
    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }
    render() {
        return (
            <div className={style.aboutWrapper}>
                <div>
                    {!this.state.imageLoaded && <Preloader/>}
                    <img src={slide} onLoad={this.handleImageLoaded.bind(this)}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
    }
};

export default compose(connect(mapStateToProps, {fetchOrders}))(About);
