import {createSelector} from "reselect";
import {AppStateType} from "./Store";
import {I_productItem} from "../types/types";

export const _getProducts = (state:AppStateType) => state.reducer.products;
export const getFilters = (state:AppStateType) => state.reducer.filters;
export const getSelectedFilter = (state:AppStateType) => state.reducer.selectedFilter;
export const getTotalPrice = (state:AppStateType) => state.reducer.totalPrice;
export const getIsFetching = (state:AppStateType) => state.reducer.isFetching;
export const getTotalQuantity = (state:AppStateType) => state.reducer.totalQuantity;
export const getOrder = (state:AppStateType) => state.reducer.order;
export const getOrderDates = (state:AppStateType) => state.reducer.orderData;
export const getOrderSuccess = (state:AppStateType) => state.reducer.orderSuccess;

export const getLanguageData = (state:AppStateType) => state.language.languageData;

export const getProducts = createSelector(_getProducts, getSelectedFilter, (products, selectedFilter) => {
    return products.filter((p:I_productItem) => {
        if (selectedFilter !== 'All' && typeof(selectedFilter) === 'string') {
            return p.filter.some(f => f.name === selectedFilter);
        } else if (typeof(selectedFilter) === 'number'){
            return p.size === selectedFilter
        } else {
            return true;
        }
    })
});
