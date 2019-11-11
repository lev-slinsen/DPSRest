import React, {Component} from 'react';
import style from './About.module.css';
import slide from "./../../assets/images/slide1.png"
import Preloader from "../../common/Preloader";
import {fetchOrders} from "../../Redux/pizzasReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import axios from "axios";


class About extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: '',
        }
    }
    componentDidMount() {
        if (!this.props.orders)
        this.props.fetchOrders();
    }

    handleImageLoaded() {
        this.setState({ image: 'loaded' });
    }
    render() {

    let asd = () => {
        axios.get(`http://127.0.0.1:8000/api/order/`).then(res=>{
            axios.post(`http://127.0.0.1:8000/api/order/`, {
                "phone": "123",
                "first_name": "asdasd",
                "delivery_date": "20",
                "delivery_time": 1,
                "address": 'asdfasdf',
                "comment": '',
                "payment": 1,
                "order_items": []
            }).then((asd)=>{
                debugger;
                console.log(asd)
            })
        })
    }
        return (
                <div className={style.headerWrapper}>


                    <div>
                        {!this.state.image &&
                        <Preloader />
                        }
                        <img src={slide} onLoad={this.handleImageLoaded.bind(this)}/>
                    </div>
                    <button onClick={asd}>asd</button>
                </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        orders: state.orders,
    }
};

export default compose(connect(mapStateToProps,{fetchOrders}))(About);
