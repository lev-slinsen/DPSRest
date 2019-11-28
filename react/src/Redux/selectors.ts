import {createSelector} from "reselect";
import {AppStateType} from "./Store";
import {IPizzaItem} from "../types/types";

export const _getPizzas = (state:AppStateType) => {
    return state.reducer.pizzas;
};
export const getPizzas = createSelector(_getPizzas, (pizzas) => {
    return pizzas.filter( (p:IPizzaItem) => true);
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
