import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
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
import Order from "./Order/Order";
import Cart from "./Cart/Cart";
import StickyBar from "./StickyBar/StickyBar";

const About = React.lazy(() => import('./About/About'));

interface I_Props {

}

interface I_ConnectedProps {
    isFetching: boolean,
    totalQuantity: number,
    totalPrice: number,
    appError: string,
}

interface I_dispatchProps {
    fetchCatalog: () => void;
}

type I_MainProps = I_Props & I_ConnectedProps & I_dispatchProps

class Main extends Component<I_MainProps> {
    componentDidMount() {
        this.props.fetchCatalog();
    }


    componentDidUpdate(prevProps: Readonly<I_MainProps>, prevState: Readonly<{}>, snapshot?: any): void {
        //retrying connect to server
        if (this.props.appError) {
            setTimeout(() => {
                this.props.fetchCatalog()
            }, 20000)
        }
    }


    render() {
        return (
            <div>
                <Header totalQuantity={this.props.totalQuantity} totalPrice={this.props.totalPrice}/>
                <div className={style.mainWrapper}>
                    {this.props.isFetching ? <Preloader/> :
                        <main>
                            <StickyBar />
                            <Switch>
                                <Route exact path="/"
                                       render={() => <Redirect to={"/catalog"}/>}/>
                                <Route path="/catalog" component={Catalog}/>
                                <Route path="/cart" component={Cart}/>
                                <Route path="/order">
                                    <Order/>
                                </Route>
                                <Route path="/about" render={withSuspense(About)}/>
                                <Route path="*" render={() => <div>Error 404</div>}/>
                            </Switch>
                        </main>
                    }
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): I_ConnectedProps => {
    return {
        isFetching: getIsFetching(state),
        totalQuantity: getTotalQuantity(state),
        totalPrice: getTotalPrice(state),
        appError: ''
    }
};

let ComposedComponent = connect(
    mapStateToProps, {fetchCatalog}
)(Main);

export default withRouter(ComposedComponent);