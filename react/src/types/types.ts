
export interface IOrderItem {
    id: number,
    name: string,
    photo_thumbnail: string,
    price: number,
    size: number,
    text_short: string,
    quantity: number
}

export interface IPizzaItem {

    filter: Array<IFilterItem>;
    id: number,
    name: string,
    photo: string,
    photo_thumbnail: string,
    price: number,
    size: number,
    text_long: string,
    text_short: string,

}
export interface IFilterItem {
    name: string
}

export interface IPostOrderItem {
    pizza_id: number,
    quantity: number,
}

export interface IAppState {
    pizzas: Array<IPizzaItem>;
    order: Array<IOrderItem>;
    totalPrice: number;
    totalQuantity: number;
    isFetching: boolean;
    filters: Array<IFilterItem>
    orderSuccess: boolean;
}
export interface IFormDataToPost {
    phone: string,
    first_name: string,
    "delivery_date": string,
    "delivery_time": number,
    "address": string,
    "comment": string,
    "payment": number,
    "order_items": Array<IPostOrderItem>
}
export interface IOrderLocalStorage {
    order: Array<IOrderItem>,
    totalPrice: number,
    totalQuantity: number,
}