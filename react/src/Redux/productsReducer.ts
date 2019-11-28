import {productsAPI} from "./API/api";
import {IAppState, IFilterItem, IOrderItem, IOrderLocalStorage, IProductItem, IPostOrderItem} from "../types/types";
import {Dispatch} from "redux";

const SET_PRODUCTS = 'MAIN_PAGE/ADD_LIST';
const SET_FILTERS = 'MAIN_PAGE/SET_FILTERS';
const CALCULATE_TOTAL = 'MAIN_PAGE/CALCULATE_TOTAL';
const INCREASE_QUANTITY = 'PRODUCTS/INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'PRODUCTS/DECREASE_QUANTITY';
const ADD_PRODUCT_TO_ORDER = 'ORDER/ADD_PRODUCT_TO_ORDER';
const DELETE_ORDER_ITEM = 'ORDER/DELETE_ORDER_ITEM';
const SET_ORDER_SUCCESS = 'ORDER/SET_ORDER_SUCCESS';
const SET_IS_FETCHING = 'COMMON/SET_IS_FETCHING';
const SET_ORDERS = 'COMMON/SET_ORDERS';

const persistedState:IOrderLocalStorage =
    localStorage.getItem('order')!== null&& localStorage.getItem('order')!== undefined ?
        // @ts-ignore
        JSON.parse(localStorage.getItem('order')) : {
            order: [],
            totalPrice: 0,
            totalQuantity: 0,
        };

const initialState:IAppState = {
    products: [
        {
            filter: [{name: 'big'}],
            id: "123",
            name: "123",
            photo: "http://93.85.88.35/media/images/%D1%80%D1%8B%D0%B1%D0%BD%D1%8B%D0%B9.jpg",
            photo_thumbnail: "http://93.85.88.35/media/images/%D1%80%D1%8B%D0%B1%D0%BD%D1%8B%D0%B9.jpg",
            price: 22.00,
            size: 2,
            text_long: "ng",
            text_short: "da",
        },
    ],
    order: persistedState.order ? persistedState.order :[],
    totalPrice: persistedState.totalPrice ? persistedState.totalPrice : 0,
    totalQuantity: persistedState.totalQuantity ? persistedState.totalQuantity : 0,
    isFetching: false,
    filters: [{name: 'one'}],
    orderSuccess: false,
};

const productsReducer = (state:IAppState = initialState, action:any) => {
    switch (action.type) {
        //setting fetching status
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        //adding feched products to state
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            };
        //adding feched filters to state
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: [...action.filters, {name: 'All'}]
            };
        //increase quantity of single pizza in state
        case INCREASE_QUANTITY:
            return {
                ...state,
                order: state.order.map((oi:IOrderItem) => {
                    if(oi.id !== action.id){
                        return oi;
                    } else {
                        return {...oi, quantity: oi.quantity+1}
                    }
                }),
            };
        //decrease quantity of single pizza in state
        case DECREASE_QUANTITY:
            return {
                ...state,
                order: state.order.map((oi:IOrderItem) => {
                    if(oi.id === action.id){
                        return {...oi, quantity: oi.quantity === 1 ? oi.quantity : oi.quantity -1}
                    } else {
                        return oi
                    }
                }),
            };
            //adding pizza item to order
        case ADD_PRODUCT_TO_ORDER:
            if (state.order.some( (oi:IOrderItem) => oi.id === action.pizzaItem.id)) {
                return {
                    ...state,
                    order: state.order.map( (oi:IOrderItem) => {
                        if (oi.id === action.pizzaItem.id) {
                            return {
                                ...oi,
                                quantity: oi.quantity + action.quantity
                            }
                        } else {
                            return oi
                        }
                    })
                }
            } else {
                let orderItem:IOrderItem = {
                    id: action.productItem.id,
                    name: action.productItem.name,
                    photo_thumbnail: action.productItem.photo_thumbnail,
                    price: Number(action.productItem.price),
                    size: Number(action.productItem.size),
                    text_short: action.productItem.text_short,
                    quantity: action.quantity
                };
                return {
                    ...state,
                    order: [
                        ...state.order,
                        orderItem
                    ]
                };
            }
        case DELETE_ORDER_ITEM:
            return {
                ...state,
                order: state.order.filter((oi:IOrderItem)=> oi.id !== action.id)
            };
        case CALCULATE_TOTAL:
            let price = 0;
            let quantity = 0;
            state.order.forEach( (oi:IOrderItem) => {
                price += oi.quantity * oi.price;
                quantity += oi.quantity;
            });
            return {
                ...state,
                totalPrice: price,
                totalQuantity: quantity,
            };
        case SET_ORDER_SUCCESS:
            return {
                ...state,
                orderSuccess: action.status,
            };
        default:
            return state;
    }
};

//interfaces
interface InterfaceSetProductsSuccess {
    type: typeof SET_PRODUCTS,
    products: Array<IProductItem>
}
interface IsetOrdersSuccess {
    type: typeof SET_ORDERS,
    orders: any
}
interface IsetFiltersSuccess {
    type: typeof SET_FILTERS,
    filters: Array<IFilterItem>
}
interface IcalculateOrder {
    type: typeof CALCULATE_TOTAL,
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
interface I_orderSuccess {
    type: typeof SET_ORDER_SUCCESS,
    status: boolean
}

//LOCAL ACTIONS
export const setProductsSuccess = (products:Array<IProductItem>): InterfaceSetProductsSuccess => {
    return {
        type: SET_PRODUCTS, products
    }
};
export const setOrdersSuccess = (orders:any):IsetOrdersSuccess => {
    return {
        type: SET_ORDERS, orders
    }
};
export const setFiltersSuccess = (filters:Array<IFilterItem>):IsetFiltersSuccess => {
    return {
        type: SET_FILTERS, filters
    }
};
export const calculateOrder = ():IcalculateOrder => {
    return {
        type: CALCULATE_TOTAL
    }
};
export const _increaseQuantity = (id:string):I_increaseQuantity => {
    return {
        type: INCREASE_QUANTITY, id
    }
};
export const _decreaseQuantity = (id:string):I_decreaseQuantity => {
    return {
        type: DECREASE_QUANTITY, id
    }
};
export const _removeFromOrder = (id:string):I_removeFromOrder => {
    return {
        type: DELETE_ORDER_ITEM, id
    }
};
export const _orderSuccess = (status:boolean):I_orderSuccess => {
    return{
        type: SET_ORDER_SUCCESS, status
    }
}

//EXTERNAL ACTIONS
export const increaseQuantity = (id:string) => (dispatch: Dispatch) => {
    dispatch(_increaseQuantity(id));
    dispatch(calculateOrder());
};
export const decreaseQuantity = (id:string) => (dispatch: Dispatch) => {
    dispatch(_decreaseQuantity(id));
    dispatch(calculateOrder());
};
export const removeFromOrder = (id:string) => (dispatch: Dispatch) => {
    dispatch(_removeFromOrder(id));
    dispatch(calculateOrder());
};

const toggleIsFetching = (status:boolean) => {
    return {
        type: SET_IS_FETCHING, status
    }
};
export const addProductToOrder = (productItem: IProductItem, quantity: number) => {
    return {
        type: ADD_PRODUCT_TO_ORDER, productItem, quantity
    }
};


//FETCH ACTIONS
export const fetchCatalog = () => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const products = await productsAPI.getProducts();
    dispatch(setProductsSuccess(
        products.map( (pz:any) => {
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

export const submitOrder = (orderData: any) => async (dispatch : any, getState: any) => {
    const order:Array<IPostOrderItem> = getState().reducer.order.map( (oi:IOrderItem) => ({quantity: oi.quantity, pizza_id: oi.id}));
        const res = await productsAPI.postOrder(orderData, order);
        if (res)
            //setting status to block buttons or redirect to payment page
            dispatch(_orderSuccess(true));
        setTimeout(dispatch(_orderSuccess(false)), 1000);
};
export const fetchOrders = () => async (dispatch: any) => {
    const orders = await productsAPI.getOrders();
    dispatch(setOrdersSuccess(orders));
};
export default productsReducer;