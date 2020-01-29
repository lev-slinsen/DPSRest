export interface I_orderItem {
    id: string,
    name: string,
    photo_thumbnail: string,
    price: number,
    size: number,
    text_short: string,
    quantity: number
}

export interface I_productItem {
    filter: Array<I_filterItem>;
    id: string,
    name: string,
    photo: string,
    photo_thumbnail: string,
    price: number,
    size: number,
    text_long: string,
    text_short: string,

}
export interface I_filterItem {
    name: string
}

export interface I_postOrderItem {
    pizza_id: number,
    quantity: number,
}

export interface I_appState {
    products: Array<I_productItem>,
    order: Array<I_orderItem>,
    totalPrice: number,
    totalQuantity: number,
    isFetching: boolean,
    filters: Array<I_filterItem>,
    selectedFilter: string,
    orderSuccess: boolean,
}
export interface I_orderToPost {
    phone: string,
    first_name: string,
    "delivery_date": string,
    "delivery_time": number,
    "address": string,
    "comment": string,
    "payment": number,
    "order_items": Array<I_postOrderItem>
}
export interface I_orderLocalStorage {
    order: Array<I_orderItem>,
    totalPrice: number,
    totalQuantity: number,
}
export interface I_languagePage {
    id: string | number,
    page_name: string,
    front_text: Array<{text_name: string, text: string}>
    "front_image": Array<{image_name: string, image: string}>
}
type Pages = "cross" | "index" ;
type PagesMap<P> = { [page in Pages]: P };
export type I_LanguageData = PagesMap<I_languagePage>;

export interface I_appLanguageState {
    languageData: I_LanguageData,
    isFetchingLanguageData: boolean,
    errorLanguageData: string | null,
}