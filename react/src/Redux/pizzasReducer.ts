import {pizzasAPI} from "./API/api";
import {IAppState, IFilterItem, IOrderItem, IOrderLocalStorage, IPizzaItem, IPostOrderItem} from "../types/types";
import {Dispatch} from "redux";

const SET_PIZZAS = 'MAIN_PAGE/ADD_LIST';
const SET_FILTERS = 'MAIN_PAGE/SET_FILTERS';
const CALCULATE_TOTAL = 'MAIN_PAGE/CALCULATE_TOTAL';
const INCREASE_QUANTITY = 'PIZZAS/INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'PIZZAS/DECREASE_QUANTITY';
const ADD_PIZZA_TO_ORDER = 'ORDER/ADD_PIZZA_TO_ORDER';
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
    pizzas: [
        {
            filter: [{name: 'big'}],
            id: 123,
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

const pizzasReducer = (state:IAppState = initialState, action:any) => {
    switch (action.type) {
        //setting fetching status
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        //adding feched pizzas to state
        case SET_PIZZAS:
            return {
                ...state,
                pizzas: action.pizzas
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
        case ADD_PIZZA_TO_ORDER:
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
                    id: action.pizzaItem.id,
                    name: action.pizzaItem.name,
                    photo_thumbnail: action.pizzaItem.photo_thumbnail,
                    price: Number(action.pizzaItem.price),
                    size: Number(action.pizzaItem.size),
                    text_short: action.pizzaItem.text_short,
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
interface InterfaceSetPizzasSuccess {
    type: typeof SET_PIZZAS,
    pizzas: Array<IPizzaItem>
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
    id: number
}
interface I_decreaseQuantity {
    type: typeof DECREASE_QUANTITY,
    id: number
}
interface I_removeFromOrder {
    type: typeof DELETE_ORDER_ITEM,
    id: number
}
interface I_orderSuccess {
    type: typeof SET_ORDER_SUCCESS,
    status: boolean
}

//LOCAL ACTIONS
export const setPizzasSuccess = (pizzas:Array<IPizzaItem>): InterfaceSetPizzasSuccess => {
    return {
        type: SET_PIZZAS, pizzas
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
export const _increaseQuantity = (id:number):I_increaseQuantity => {
    return {
        type: INCREASE_QUANTITY, id
    }
};
export const _decreaseQuantity = (id:number):I_decreaseQuantity => {
    return {
        type: DECREASE_QUANTITY, id
    }
};
export const _removeFromOrder = (id:number):I_removeFromOrder => {
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
export const increaseQuantity = (id:number) => (dispatch: Dispatch) => {
    dispatch(_increaseQuantity(id));
    dispatch(calculateOrder());
};
export const decreaseQuantity = (id:number) => (dispatch: Dispatch) => {
    dispatch(_decreaseQuantity(id));
    dispatch(calculateOrder());
};
export const removeFromOrder = (id:number) => (dispatch: Dispatch) => {
    dispatch(_removeFromOrder(id));
    dispatch(calculateOrder());
};

const toggleIsFetching = (status:boolean) => {
    return {
        type: SET_IS_FETCHING, status
    }
};
export const addPizzaToOrder = (pizzaItem: IPizzaItem, quantity: number) => {
    return {
        type: ADD_PIZZA_TO_ORDER, pizzaItem, quantity
    }
};


//FETCH ACTIONS
export const fetchCatalog = () => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const pizzas = await pizzasAPI.getPizzas();
    dispatch(setPizzasSuccess(
        pizzas.map( (pz:any) => {
            return {
            ...pz,
                price: parseFloat(pz.price),
                size: parseFloat(pz.size)
            }
        }
    )));
    const filters = await pizzasAPI.getFilters();
    dispatch(setFiltersSuccess(filters));
    dispatch(toggleIsFetching(false));
};

export const submitOrder = (orderData: any) => async (dispatch : any, getState: any) => {
    const order:Array<IPostOrderItem> = getState().reducer.order.map( (oi:IOrderItem) => ({quantity: oi.quantity, pizza_id: oi.id}));
        const res = await pizzasAPI.postOrder(orderData, order);
        if (res)
            //setting status to block buttons or redirect to payment page
            dispatch(_orderSuccess(true));
        setTimeout(dispatch(_orderSuccess(false)), 1000);
};
export const fetchOrders = () => async (dispatch: any) => {
    const orders = await pizzasAPI.getOrders();
    dispatch(setOrdersSuccess(orders));
};
export default pizzasReducer;