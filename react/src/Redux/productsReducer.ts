import {I_appState, I_orderItem, I_orderLocalStorage} from "../types/types";
import {
    ADD_PRODUCT_TO_ORDER,
    CALCULATE_TOTAL,
    DECREASE_QUANTITY,
    DELETE_ORDER_ITEM,
    I_appActions,
    INCREASE_QUANTITY,
    SET_COMMON_ORDER_SUCCESS,
    SET_FILTERS,
    SET_IS_FETCHING,
    SET_ORDER_SUCCESS,
    SET_PRODUCTS,
    SET_SORT_FILTER
} from "./actions";

const persistedState: I_orderLocalStorage =
    localStorage.getItem('order') !== null && localStorage.getItem('order') !== undefined ?
        // @ts-ignore
        JSON.parse(localStorage.getItem('order')) : {
            order: [],
            totalPrice: 0,
            totalQuantity: 0,
        };

const initialState: I_appState = {
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
    order: persistedState.order ? persistedState.order : [],
    totalPrice: persistedState.totalPrice ? persistedState.totalPrice : 0,
    totalQuantity: persistedState.totalQuantity ? persistedState.totalQuantity : 0,
    isFetching: false,
    filters: [{name: 'one'}],
    selectedFilter: 'All',
    orderSuccess: false,
    orderData: []
};


const productsReducer = (state: I_appState = initialState, action: I_appActions) => {
    switch (action.type) {
        //setting fetching status
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        //adding fetched products to state
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            };
        //adding fetched disabled dates and times to state
        case SET_COMMON_ORDER_SUCCESS:
            return {
                ...state,
                orderData: action.orderData
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: [...action.filters, {name: 'All'}]
            };
        case SET_SORT_FILTER:
            return {
                ...state,
                selectedFilter: action.filter
            };
        //increase quantity of single product in state
        case INCREASE_QUANTITY:
            return {
                ...state,
                order: state.order.map((oi: I_orderItem) => {
                    if (oi.id !== action.id) {
                        return oi;
                    } else {
                        return {...oi, quantity: oi.quantity + 1}
                    }
                }),
            };
        //decrease quantity of single product in state
        case DECREASE_QUANTITY:
            return {
                ...state,
                order: state.order.map((oi: I_orderItem) => {
                    if (oi.id === action.id) {
                        return {...oi, quantity: oi.quantity === 1 ? oi.quantity : oi.quantity - 1}
                    } else {
                        return oi
                    }
                }),
            };
        //adding product item to order
        case ADD_PRODUCT_TO_ORDER:
            if (state.order.some((oi: I_orderItem) => oi.id === action.productItem.id)) {
                return {
                    ...state,
                    order: state.order.map((oi: I_orderItem) => {
                        if (oi.id === action.productItem.id) {
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
                let orderItem: I_orderItem = {
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
                order: state.order.filter((oi: I_orderItem) => oi.id !== action.id)
            };
        case CALCULATE_TOTAL:
            let price = 0;
            let quantity = 0;
            state.order.forEach((oi: I_orderItem) => {
                price = price + oi.quantity * oi.price;
                quantity = quantity + oi.quantity;
            });
            return {
                ...state,
                totalPrice: +price.toFixed(2),
                totalQuantity: quantity,
            };
        //adding status of Posting Order
        case SET_ORDER_SUCCESS:
            return {
                ...state,
                orderSuccess: action.status,
            };
        default:
            return state;
    }
};


export default productsReducer;