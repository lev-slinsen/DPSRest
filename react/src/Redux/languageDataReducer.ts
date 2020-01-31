import {languageDataAPI} from "./API/api";
import {
    I_appLanguageState, I_languagePage, I_LanguageData,
} from "../types/types";

import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./Store";
import {I_appActions} from "./productsReducer";
import {FormAction} from "redux-form";
import {convertArrayToObject} from "../utils/object-helpers";

const SET_LANGUAGE_DATA_SUCCESS = 'LANGUAGE_DATA/SET_LANGUAGE_DATA_SUCCESS';
const SET_LANGUAGE_DATA_ERROR = 'LANGUAGE_DATA/SET_LANGUAGE_DATA_ERROR';
const SET_LANGUAGE_DATA_FETCHING = 'LANGUAGE_DATA/SET_LANGUAGE_DATA_FETCHING';

const initialState: I_appLanguageState = {
    languageData: {
        cross: {
            id: '1',
            page_name: "cross",
            front_text: [
                {
                    "text_name": "header time",
                    "text": "Мы работаем с пн.-пт. с 8 до 19.00"
                },
                {
                    "text_name": "header phone",
                    "text": "+375 (33) 658-02-20"
                }
            ],
            front_image: []
        },
        index: {
            id: 2,
            page_name: "index",
            front_text: [
                {
                    text_name: "carousel text 1",
                    text: "Пекарня Печорин предлагает Вам выпечку по оригинальным рецептам," +
                        " основанных на классической славянской кухне."
                },
                {
                    text_name: "carousel text 2",
                    text: "Тонкое, без дрожжевое тесто, много разнообразной начинки," +
                        " это и есть настоящие, правильные пирожки."
                },
                {
                    text_name: "carousel text 3",
                    text: "Мы предлагаем только свежую выпечку, Наши кондитера приготовят и" +
                        " отпекут Ваш заказ непосредственно перед доставкой."
                }
            ],
            front_image: [
                {
                    image_name: "carousel image 3",
                    image: "/media/slide2.png"
                },
                {
                    image_name: "carousel image 2",
                    image: "/media/slide1.png"
                },
                {
                    image_name: "carousel image 1",
                    image: "/media/1.png"
                }
            ]
        }
    },
    isFetchingLanguageData: false,
    errorLanguageData: null,
};

export type I_languageStateActions =
    I_setDataSuccess  |
    I_setLanguageDataError | I_setLanguageDataFetching

type GetStateType = () => AppStateType

const languageReducer = (state: I_appLanguageState = initialState, action: I_languageStateActions) => {
    switch (action.type) {
        //setting fetching status
        case SET_LANGUAGE_DATA_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        //error Status
        case SET_LANGUAGE_DATA_ERROR:
            return {
                ...state,
                errorLanguageData: action.errorMessage
            };
        //adding data to state
        case SET_LANGUAGE_DATA_SUCCESS:
            return {
                ...state,
                languageData: {
                    ...state.languageData,
                    ...action.languageData
                },
                errorLanguageData: null,
            };
        default:
            return state;
    }
};

//interfaces
interface I_setDataSuccess {
    type: typeof SET_LANGUAGE_DATA_SUCCESS,
    languageData: I_LanguageData
}

interface I_setLanguageDataError {
    type: typeof SET_LANGUAGE_DATA_ERROR,
    errorMessage: string
}

interface I_setLanguageDataFetching {
    type: typeof SET_LANGUAGE_DATA_FETCHING,
    status: boolean
}

//LOCAL ACTIONS
export const _setDataSuccess = (languageData: I_LanguageData): I_setDataSuccess =>
    ({type: SET_LANGUAGE_DATA_SUCCESS, languageData});

export const _setLanguageDataError = (errorMessage: string): I_setLanguageDataError =>
    ({type: SET_LANGUAGE_DATA_ERROR, errorMessage});

export const _setLanguageDataFetching = (status: boolean): I_setLanguageDataFetching =>
    ({type: SET_LANGUAGE_DATA_FETCHING, status});


//FETCH ACTIONS
export const fetchLanguageData = () =>
    async (dispatch: ThunkDispatch<{}, {}, I_languageStateActions | I_appActions | FormAction >, getState: GetStateType) => {
    dispatch(_setLanguageDataFetching(true));
    try {
        const data: Array<I_languagePage> = await languageDataAPI.getLanguageData();
        dispatch(_setDataSuccess(convertArrayToObject(data, "page_name")));
    } catch (err) {
        console.log(err);
        dispatch(_setLanguageDataError(err.message));
        dispatch(_setDataSuccess(initialState.languageData));
    }
    dispatch(_setLanguageDataFetching(false));
};

export default languageReducer;