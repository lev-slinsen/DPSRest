import {pizzasAPI} from "./API/api";

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

const persistedState = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {};
const initialState = {
    pizzas: [
        {
            filter: [{name: 'big'}],
            id: 123,
            name: "123",
            photo: "http://93.85.88.35/media/images/%D1%80%D1%8B%D0%B1%D0%BD%D1%8B%D0%B9.jpg",
            photo_thumbnail: "http://93.85.88.35/media/images/%D1%80%D1%8B%D0%B1%D0%BD%D1%8B%D0%B9.jpg",
            price: "22.00",
            size: "2",
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

const pizzasReducer = (state = initialState, action) => {
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
                pizzas: action.pizzas.filter( pz => (pz.active || pz.active === undefined )&& pz)
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
                order: state.order.map(pz => {
                    if(pz.id !== action.id){
                        return pz;
                    } else {
                        return {...pz, quantity: pz.quantity+1}
                    }
                }),
            };
        //decrease quantity of single pizza in state
        case DECREASE_QUANTITY:
            return {
                ...state,
                order: state.order.map(pz => {
                    if(pz.id === action.id){
                        return {...pz, quantity: pz.quantity === 1 ? pz.quantity : pz.quantity -1}
                    } else {
                        return pz
                    }
                }),
            };
            //adding pizza item to order
        case ADD_PIZZA_TO_ORDER:
            if (state.order.some( i => i.id === action.pizzaItem.id)) {
                return {
                    ...state,
                    order: state.order.map( i => {
                        if (i.id === action.pizzaItem.id) {
                            return {
                                ...i,
                                quantity: i.quantity + action.quantity
                            }
                        } else {
                            return i
                        }
                    })
                }
            } else {
                let orderItem = {
                    id: action.pizzaItem.id,
                    name: action.pizzaItem.name,
                    photo: action.pizzaItem.photo,
                    photo_thumbnail: action.pizzaItem.photo_thumbnail,
                    price: action.pizzaItem.price,
                    size: action.pizzaItem.size,
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
                order: state.order.filter(i=> i.id !== action.id)
            };
        case CALCULATE_TOTAL:
            let price = 0;
            let quantity = 0;
            state.order.forEach( i => {
                price += i.quantity * i.price;
                quantity += i.quantity;
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

//LOCAL ACTIONS
export const setPizzasSuccess = (pizzas) => {
    return {
        type: SET_PIZZAS, pizzas
    }
};
export const setOrdersSuccess = (orders) => {
    return {
        type: SET_ORDERS, orders
    }
};
export const setFiltersSuccess = (filters) => {
    return {
        type: SET_FILTERS, filters
    }
};
export const calculateOrder = () => {
    return {
        type: CALCULATE_TOTAL
    }
};
export const _increaseQuantity = (id) => {
    return {
        type: INCREASE_QUANTITY, id
    }
};
export const _decreaseQuantity = (id) => {
    return {
        type: DECREASE_QUANTITY, id
    }
};
export const _removeFromOrder = (id) => {
    return {
        type: DELETE_ORDER_ITEM, id
    }
};
export const _orderSuccess = (status) => {
    return{
        type: SET_ORDER_SUCCESS, status
    }
}

//EXTERNAL ACTIONS
export const increaseQuantity = (id) => (dispatch) => {
    dispatch(_increaseQuantity(id));
    dispatch(calculateOrder());
};
export const decreaseQuantity = (id) => (dispatch) => {
    dispatch(_decreaseQuantity(id));
    dispatch(calculateOrder());
};
export const removeFromOrder = (id) => (dispatch) => {
    dispatch(_removeFromOrder(id));
    dispatch(calculateOrder());
};

const toggleIsFetching = (status) => {
    return {
        type: SET_IS_FETCHING, status
    }
};
export const addPizzaToOrder = (pizzaItem, quantity) => {
    return {
        type: ADD_PIZZA_TO_ORDER, pizzaItem, quantity
    }
};


//FETCH ACTIONS
export const fetchCatalog = () => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const pizzas = await pizzasAPI.getPizzas();
    dispatch(setPizzasSuccess(pizzas));
    const filters = await pizzasAPI.getFilters();
    dispatch(setFiltersSuccess(filters));
    dispatch(toggleIsFetching(false));
};

export const submitOrder = (orderData) => async (dispatch, getState) => {
    const order = getState().reducer.order.map( oi => ({quantity: oi.quantity, pizza_obj: oi.id}));
    const res = await pizzasAPI.postOrder(orderData, order);
    if (res)
    dispatch(_orderSuccess(true));
    setTimeout(dispatch(_orderSuccess(false)), 1000);
};
export const fetchOrders = () => async (dispatch) => {
    const orders = await pizzasAPI.getOrders();
    dispatch(setOrdersSuccess(orders));
};
export default pizzasReducer;