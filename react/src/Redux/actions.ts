import {Dispatch} from "redux";
import {I_filterItem, I_orderDates, I_orderFormData, I_orderItem, I_postOrderItem, I_productItem} from "../types/types";
import {ThunkDispatch} from "redux-thunk";
import {productsAPI} from "./API/api";
import {stopSubmit} from "redux-form";
import {AppStateType} from "./Store";

export const SET_PRODUCTS = 'MAIN_PAGE/ADD_LIST';
export const SET_FILTERS = 'MAIN_PAGE/SET_FILTERS';
export const CALCULATE_TOTAL = 'MAIN_PAGE/CALCULATE_TOTAL';
export const SET_SORT_FILTER = 'MAIN_PAGE/SET_SORT_FILTER';
export const INCREASE_QUANTITY = 'PRODUCTS/INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'PRODUCTS/DECREASE_QUANTITY';
export const ADD_PRODUCT_TO_ORDER = 'ORDER/ADD_PRODUCT_TO_ORDER';
export const DELETE_ORDER_ITEM = 'ORDER/DELETE_ORDER_ITEM';
export const SET_ORDER_SUCCESS = 'ORDER/boolean/SET_ORDER_SUCCESS';
export const SET_IS_FETCHING = 'COMMON/boolean/SET_IS_FETCHING';
export const SET_COMMON_ORDER_SUCCESS = 'COMMON/SET_COMMON_ORDER_SUCCESS';

//interfaces
interface I_setProductsSuccess {
    type: typeof SET_PRODUCTS,
    products: Array<I_productItem>
}

interface I_setOrderSuccess {
    type: typeof SET_ORDER_SUCCESS,
    status: boolean
}

interface I_setOrderDataFetchSuccess {
    type: typeof SET_COMMON_ORDER_SUCCESS,
    orderData: I_orderDates[]
}

interface I_setFiltersSuccess {
    type: typeof SET_FILTERS,
    filters: Array<I_filterItem>
}

interface I_calculateOrder {
    type: typeof CALCULATE_TOTAL
}

interface I_increaseQuantity {
    type: typeof INCREASE_QUANTITY,
    id: string
}

interface I_decreaseQuantity {
    type: typeof DECREASE_QUANTITY,
    id: string
}

interface I_removeFromOrder {
    type: typeof DELETE_ORDER_ITEM,
    id: string
}

interface I_setSortFilter {
    type: typeof SET_SORT_FILTER,
    filter: string | number
}

interface I_setIsFetching {
    type: typeof SET_IS_FETCHING,
    status: boolean
}

interface I_addProductToOrder {
    type: typeof ADD_PRODUCT_TO_ORDER,
    productItem: I_productItem,
    quantity: number
}

export type I_appActions = I_setProductsSuccess |
    I_setOrderDataFetchSuccess | I_setFiltersSuccess | I_calculateOrder |
    I_increaseQuantity | I_decreaseQuantity | I_removeFromOrder |
    I_setOrderSuccess | I_setSortFilter | I_setIsFetching |
    I_addProductToOrder

type GetStateType = () => AppStateType

//LOCAL ACTIONS
export const setProductsSuccess = (products: Array<I_productItem>): I_setProductsSuccess =>
    ({type: SET_PRODUCTS, products});

export const setOrderDataFetchSuccess = (orderData: Array<I_orderDates>): I_setOrderDataFetchSuccess =>
    ({type: SET_COMMON_ORDER_SUCCESS, orderData});

export const setFiltersSuccess = (filters: Array<I_filterItem>): I_setFiltersSuccess =>
    ({type: SET_FILTERS, filters});

export const setSortFilter = (filter: string | number): I_setSortFilter =>
    ({type: SET_SORT_FILTER, filter});

export const calculateOrder = (): I_calculateOrder =>
    ({type: CALCULATE_TOTAL});

export const _increaseQuantity = (id: string): I_increaseQuantity =>
    ({type: INCREASE_QUANTITY, id});

export const _decreaseQuantity = (id: string): I_decreaseQuantity =>
    ({type: DECREASE_QUANTITY, id});

export const _removeFromOrder = (id: string): I_removeFromOrder =>
    ({type: DELETE_ORDER_ITEM, id});

export const _setOrderSuccess = (status: boolean): I_setOrderSuccess =>
    ({type: SET_ORDER_SUCCESS, status});

//EXTERNAL ACTIONS
export const increaseQuantity = (id: string) => (dispatch: Dispatch) => {
    dispatch(_increaseQuantity(id));
    dispatch(calculateOrder());
};
export const decreaseQuantity = (id: string) => (dispatch: Dispatch) => {
    dispatch(_decreaseQuantity(id));
    dispatch(calculateOrder());
};
export const removeFromOrder = (id: string) => (dispatch: Dispatch) => {
    dispatch(_removeFromOrder(id));
    dispatch(calculateOrder());
};

const toggleIsFetching = (status: boolean): I_setIsFetching =>
    ({ type: SET_IS_FETCHING, status });

export const addProductToOrder = (productItem: I_productItem, quantity: number): I_addProductToOrder =>
    ({ type: ADD_PRODUCT_TO_ORDER, productItem, quantity});

//FETCH ACTIONS
export const fetchCatalog = () => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const products = await productsAPI.getProducts();
    dispatch(setProductsSuccess(
        products.map((pz: any) => {
                return {
                    ...pz,
                    price: parseFloat(pz.price),
                    size: parseFloat(pz.size)
                }
            }
        )));
    const filters = await productsAPI.getFilters();
    dispatch(setFiltersSuccess(filters));
    dispatch(toggleIsFetching(false));
};
export const submitOrder = (orderData: I_orderFormData) => async (dispatch: ThunkDispatch<{}, {}, I_appActions>, getState: GetStateType) => {
    try {
        const orderItems: Array<I_postOrderItem> = getState().reducer.order.map((oi: I_orderItem) =>
            ({quantity: oi.quantity, pizza: oi.id}));
        const res = await productsAPI.postOrder(orderData, orderItems);
        if (res && res.toLowerCase() === 'created') {
            //setting status to block buttons or redirect to payment page
            dispatch(_setOrderSuccess(true));
        }
    } catch (err) {
        dispatch(stopSubmit('order', {_error: err.message ? err.message : 'some Error'}))
    }
    setTimeout(() => dispatch(_setOrderSuccess(false)), 4000);
};

export const fetchOrderInfo = () => async (dispatch: any) => {
    try {
        const orderData = await productsAPI.getOrderData();
        dispatch(setOrderDataFetchSuccess(orderData));
    } catch (err) {
        console.log(err);
    }
};
