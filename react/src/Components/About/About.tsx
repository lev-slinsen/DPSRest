import React, {Component} from 'react';
import slide from "./../../assets/images/slide1.png"
import Preloader from "../../common/Preloader";
import {fetchOrders} from "../../Redux/productsReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import style from './About.module.css';
import {AppStateType} from "../../Redux/Store";
import axios from "axios";
import {I_filterItem, I_productItem} from "../../types/types";

interface IProps {
    filters: Array<I_filterItem>,
    pizzas: Array<I_productItem>
}
interface IState {
    imageLoaded: boolean
    order: any
}
interface I_dispatchProps {
    fetchOrders: () => void
}

class About extends Component<IProps&I_dispatchProps&IState> {
    state:IState = {
        imageLoaded: false,
        order: {
            phone: 'string',
            first_name: 'string',
            delivery_date: '2000-10-21',
            delivery_time: 2,
            address: 'string',
            comment: 'string',
            payment: 2,
            order_items: [{
                pizza_id: 2,
                quantity: 3,
            }, {
                pizza_id: 1,
                quantity: 4,
            }]
        }
    };

    componentDidMount(): void {
        this.props.fetchOrders();
    }

    postOrder = () => {
        console.log(this.state.order);
        axios.post("http://127.0.0.1:8000/api/order/", this.state.order, {withCredentials:true})
            .then( res => {
                alert(res.request)
            })
            .catch( err => {
                debugger
                alert(err)
            })

    };


    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }

    render() {
        let displayed = Object.entries(this.state.order).map(([key, value]) => {

            if (key !== 'order_items') {
                // @ts-ignore
                return <p>{key} : <b>{value}</b></p>
            } else {
                return <p>order_items: [<p>{'{pizza_id: 2,quantity: 3},'}</p><p>{'{pizza_id: 1,quantity: 4}'}</p>]</p>
            }
        });
        return (
            <div className={style.aboutWrapper}>
                <div>
                    {!this.state.imageLoaded && <Preloader/>}
                    <img src={slide} onLoad={this.handleImageLoaded.bind(this)} alt={"Pechorin Bulki"}/>
                </div>

                <div>
                    {displayed}
                </div>
                <button onClick={this.postOrder}>post test order</button>
            </div>
        );
    }
}

const mapStateToProps = (state:AppStateType) => {
    return {
        filters: state.reducer.filters,
        pizzas: state.reducer.products
    }
};

export default compose(connect(mapStateToProps, {fetchOrders}))(About);