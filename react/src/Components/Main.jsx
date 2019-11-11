import React, {Component} from 'react';
import '../App.css';
import style from './Main.module.css';
import {Redirect, Route} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import Catalog from "./Catalog/Catalog";
import Preloader from "../common/Preloader";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {fetchCatalog} from "../Redux/pizzasReducer";
import {withSuspense} from "../hoc/withSuspense";

const About = React.lazy(() => import('./About/About'));
const Order = React.lazy(() => import('./Order/Order'));
const Cart = React.lazy(() => import("./Cart/Cart"));



class Main extends Component {
    componentDidMount() {
        this.props.fetchCatalog();
    }

    render() {

        return (
            <div>
                <Header totalQuantity={this.props.totalQuantity} totalPrice={this.props.totalPrice}/>
                <div className={style.mainWrapper}>
                    {this.props.isFetching ?
                        <Preloader/> :
                        <div>
                            <Route exact path="/"
                                   render={()=> <Redirect to={"/catalog"}/>}/>
                            <Route path="/catalog" render={() => <Catalog/>}/>
                            <Route path="/order" render={withSuspense(Order)}/>
                            <Route path="/cart" render={withSuspense(Cart)}/>
                            <Route path="/about" render={withSuspense(About)}/>
                        </div>
                    }
                </div>
                <Footer/>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.reducer.isFetching,
        totalQuantity: state.reducer.totalQuantity,
        totalPrice: state.reducer.totalPrice,
    }
};
export default compose(
    connect(mapStateToProps, {fetchCatalog})
)(Main);
