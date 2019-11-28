import React, {Component} from 'react';
import style from './Catalog.module.css';
import ProductCard from "../ProductItem/ProductItem";
import {compose} from "redux";
import {connect} from "react-redux";
import {addProductToOrder, calculateOrder} from "../../Redux/productsReducer";
import bgPict from "./../../assets/images/slide1.png"
import PopupWrapper from "../../common/PopupWrapper";
import {IFilterItem, IProductItem} from "../../types/types";
import {AppStateType} from "../../Redux/Store";
import {getFilters, getProducts} from "../../Redux/selectors";


interface IConnectProps {
    products: Array<IProductItem>,
    filters: Array<IFilterItem>,
}

interface LinkDispatchProps {
    addProductToOrder: (productItem: IProductItem, quantity: number) => void;
    calculateOrder: () => void;
}

interface IState {
    selectedFilter: string
    bgPict: string
    isPopupOpen: boolean
    popupProduct: IProductItem
}

class Catalog extends Component<IConnectProps & LinkDispatchProps> {

    state: IState = {
        selectedFilter: 'All',
        bgPict: bgPict,
        isPopupOpen: false,
        popupProduct: this.props.products[0],
    };

    setPopupOpen = (product: IProductItem, option: boolean) => {
        this.setState({popupProduct: product});
        this.setState({isPopupOpen: option});
    };
    changeFilter = (filterName: string) => {
        this.setState({selectedFilter: filterName})
    };

    render() {

        let products = this.props.products
            .filter(p => {
                if (this.state.selectedFilter !== 'All') {
                    return p.filter.some(f => f.name === this.state.selectedFilter);
                } else {
                    return true;
                }
            })
            .map(p => (
                <ProductCard product={p}
                           openPopup={() => {
                               this.setPopupOpen(p, true)
                           }}
                           key={p.id}
                           calculateOrder={this.props.calculateOrder}
                           addProductToOrder={this.props.addProductToOrder}
                />
            ));

        let filters = this.props.filters
            .map(f => (
                <button
                    key={f.name}
                    className={style.filterBtn}
                    onClick={() => {
                        this.changeFilter(f.name)
                    }}
                >
                    {f.name}
                </button>
            ));

        return (
            <div>
                {this.state.isPopupOpen &&
                <PopupWrapper
                    product={this.state.popupProduct}
                    setPopupClose={() => {
                        this.setPopupOpen(this.state.popupProduct, false)
                    }}
                />}

                <div>
                    <div>
                        <div style={{
                            backgroundImage: `url(${this.state.bgPict})`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            height: `35rem`,
                            backgroundSize: 'cover',
                        }}
                             className={style.caruselContent}>
                            <h3>
                                Carusel Title
                            </h3>
                        </div>
                        <div className={style.container}>{filters}</div>
                    </div>
                    <hr/>
                    <div className={style.productsContainer}>
                        {products}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): IConnectProps => {
    return {
        products: getProducts(state),
        filters: getFilters(state),
    }
};
export default compose(
    connect(mapStateToProps, {addProductToOrder, calculateOrder})
)(Catalog);