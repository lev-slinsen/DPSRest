import React, {Component, useCallback, useState} from 'react';
import style from './Catalog.module.css';
import ProductCard from "../ProductItem/ProductItem";
import {compose} from "redux";
import {connect} from "react-redux";
import bgPict from "./../../assets/images/slide1.png"
import {I_filterItem, I_LanguageData, I_productItem} from "../../types/types";
import {AppStateType} from "../../Redux/Store";
import {getFilters, getLanguageData, getProducts, getSelectedFilter} from "../../Redux/selectors";
import Slider from "../../common/Slider";
import {ProductsModal} from "../../common/PopupWrapper";
import {addProductToOrder, calculateOrder, setSortFilter} from "../../Redux/actions";


interface I_ConnectProps {
    products: Array<I_productItem>,
    filters: Array<I_filterItem>,
    selectedFilter: string,
    languageData: I_LanguageData
}

interface I_LinkDispatchProps {
    addProductToOrder: (productItem: I_productItem, quantity: number) => void;
    calculateOrder: () => void;
    setSortFilter: (filter: string) => void;
}

interface I_State {
    bgPict: string
    isPopupOpen: boolean
    popupProduct: I_productItem
}

const Catalog: React.FC<I_ConnectProps & I_LinkDispatchProps> = (props) => {

    let [state, setState] = useState<I_State>({
        bgPict: bgPict,
        isPopupOpen: false,
        popupProduct: props.products[0],
    });
    let {languageData} = props;

    const setPopupOpen = useCallback((product: I_productItem, option: boolean) => {
        setState({...state, popupProduct: product});
        setState({...state, isPopupOpen: option});
    }, []);
    const setPopupClose = useCallback(() => {
        setPopupOpen(state.popupProduct, false)
    }, []);
    const callCalculateOrder = useCallback(props.calculateOrder, []);
    const callAddProductToOrder = useCallback(props.addProductToOrder, []);

    const changeFilter = (filterName: string) => {
        props.setSortFilter(filterName)
    };

    let products = props.products
        .map(p => (
            <ProductCard product={p}
                         openPopup={setPopupOpen}
                         key={p.id}
                         calculateOrder={callCalculateOrder}
                         addProductToOrder={callAddProductToOrder}
            />
        ));
    let filters = props.filters
        .map(f => (
            <button
                key={f.name}
                className={style.filterBtn}
                onClick={() => {
                    changeFilter(f.name)
                }}
            >
                {f.name}
            </button>
        ));
    console.log('!!!!!!!!!!!!!! CATALOG RENDERED');
    return (
        <div>
            {state.isPopupOpen &&
            <ProductsModal
                product={state.popupProduct}
                setPopupClose={setPopupClose}
            />}

            <div>
                <Slider
                    commonImages={languageData.index.front_image}
                    commonTexts={languageData.index.front_text}
                />
                <div className={style.container}>{filters}</div>
                <hr/>
                <div className={style.productsContainer}>
                    {products}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: AppStateType): I_ConnectProps => {
    return {
        products: getProducts(state),
        filters: getFilters(state),
        selectedFilter: getSelectedFilter(state),
        languageData: getLanguageData(state)
    }
};
export default compose(
    connect(mapStateToProps, {addProductToOrder, calculateOrder, setSortFilter})
)(Catalog);
