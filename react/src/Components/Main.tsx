import React, {Component} from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import Preloader from "../common/Preloader";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {fetchCatalog} from "../Redux/productsReducer";
import {withSuspense} from "../hoc/withSuspense";
import {AppStateType} from "../Redux/Store";
import Catalog from "./Catalog/Catalog";
import '../App.css';
import style from './Main.module.css';
import {getIsFetching, getTotalPrice, getTotalQuantity} from "../Redux/selectors";

const About = React.lazy(() => import('./About/About'));
const Order = React.lazy(() => import('./Order/Order'));
const Cart = React.lazy(() => import("./Cart/Cart"));

interface IProps {
    title: string
}

interface IConnectProps {
    isFetching: boolean,
    totalQuantity: number,
    totalPrice: number,
}

interface LinkDispatchProps {
    fetchCatalog: () => void;
}

class Main extends Component<IProps & IConnectProps & LinkDispatchProps> {
    componentDidMount() {
        this.props.fetchCatalog();
        //listning for errors
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors());
    }

    catchAllUnhandledErrors = (promiseRejectionEvent?: any): any => {
        console.log('some error occured');
    };

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors())
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
                                   render={() => <Redirect to={"/catalog"}/>}/>
                            <Route path="/catalog" component={Catalog}/>
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

const mapStateToProps = (state: AppStateType): IConnectProps => {
    return {
        isFetching: getIsFetching(state),
        totalQuantity: getTotalQuantity(state),
        totalPrice: getTotalPrice(state),
    }
};
export default compose(
    withRouter,
    connect(mapStateToProps, {fetchCatalog})
)(Main);