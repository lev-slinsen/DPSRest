import {createSelector} from "reselect";
import {AppStateType} from "./Store";
import {IProductItem} from "../types/types";

export const _getProducts = (state:AppStateType) => {
    return state.reducer.products;
};
export const getProducts = createSelector(_getProducts, (products) => {
    return products.filter( (p:IProductItem) => true);
});
export const getFilters = (state:AppStateType) => {
    return state.reducer.filters;
};
export const getTotalPrice = (state:AppStateType) => {
    return state.reducer.totalPrice;
};
export const getIsFetching = (state:AppStateType) => {
    return state.reducer.isFetching;
};
export const getTotalQuantity = (state:AppStateType) => {
    return state.reducer.totalQuantity;
};
export const getOrder = (state:AppStateType) => {
    return state.reducer.order;
};
