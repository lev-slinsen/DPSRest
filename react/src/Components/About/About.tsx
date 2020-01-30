import React, {Component} from 'react';
import {fetchOrders} from "../../Redux/productsReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import style from './About.module.css';
import {AppStateType} from "../../Redux/Store";
import axios from "axios";
import {I_filterItem, I_productItem} from "../../types/types";
import Slider from "../../common/Slider";
import bgPict from "../../assets/images/slide1.png";

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

let commonCarusel = {
    index: {
        "front_image": [
            {"image": bgPict},
            {"image": bgPict},
            {"image": bgPict}
        ],
        front_text: [
            {text:"carousel asdasdasd image 1"},
            {text:"Общество с ограниченной ответственностью «Печь Орин» image 2"},
            {text:"Общество с ограниченной ответственностью «Печь Орин» image 3"}
        ]
    }
};

class About extends Component<IProps&I_dispatchProps&IState> {
    state:IState = {
        imageLoaded: false,
        order: {
            phone: '222333111',
            first_name: 'string',
            delivery_date: '2000-10-21',
            delivery_time: 2,
            address: 'string',
            comment: 'string',
            payment: 0,
            order_items: [
                {
                quantity: 3,
                pizza: 1,
                },{
                quantity: 2,
                pizza: 2,
                }
            ]
        }
    };

    postOrder = () => {
        console.log(this.state.order);
        axios.post("http://127.0.0.1:8000/api/order/", this.state.order)
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

        return (
            <div>
                <Slider
                    commonImages={commonCarusel.index.front_image}
                    commonTexts={commonCarusel.index.front_text}
                />
                <div>
                    OMG
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