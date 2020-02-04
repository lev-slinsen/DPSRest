import style from "./FormControl.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLength100, maxLength15, minLength10, minLength3, number, required} from "../../utils/validators";
import {RenderDateTimePicker} from "./DatePicker";
import React from "react";
import {DropDownSelect, phoneMask, RadioButtonRender, renderField, RenderTextarea} from "./FormsControls";
import {I_orderDates, I_orderFormData} from "../../types/types";
import ButtonMain from "../Buttons/ButtonMain";
import {NavLink} from "react-router-dom";

interface I_Props {
    orderDisabled: I_orderDates[]
}

export const OrderReduxForm:React.FC<InjectedFormProps<I_orderFormData, I_Props> & I_Props> =
    (props) => {
    const {handleSubmit, pristine, submitting, error, orderDisabled} = props;
    const times = ["10 - 11", "11 - 12", "12 - 13", "13 - 14", "14 - 15", "15 - 16", "16 - 17"];
    let dates = ["2020-02-03"];
    orderDisabled.forEach( (o:I_orderDates) => o.work_dates.forEach( d => dates.push(d.date)));
    const payments = ["cash", "card", "online"];

    return (
        <form className={style.formControl} onSubmit={handleSubmit}>
            <Field name="phone"
                   type="text"
                // @ts-ignore
                   label="Номер телефона"
                   component={renderField}
                   {...phoneMask}
                   validate={[required, number]}
            />
            <Field name="first_name"
                   type="text"
                   component={renderField}
                   label="Имя"
                   validate={[required, minLength3, maxLength15]}
            />
            <Field name="delivery_date"
                   component={RenderDateTimePicker}
                   label="Дата доставки заказа"
                   dates={dates}
                   validate={[required]}
            />
            <Field name="delivery_time"
                   type="select"
                   component={DropDownSelect}
                   label="Время доставки"
                   times={times}
                   validate={[required]}
            />
            <Field name="address"
                   type="text"
                   component={renderField}
                   label="Адрес доставки"
                   validate={[required, minLength10, maxLength100]}
            />
            <Field name="comment"
                   type="textarea"
                   component={RenderTextarea}
                   values={payments}
                   label="Комментарий"
                   validate={[]}
            />

            <Field name="payment"
                   type="radio"
                   component={RadioButtonRender}
                   values={payments}
                   label="Метод Оплаты"
                   validate={[required]}
            />
            <hr />
            {error && <div>
                <span className={style.errorMessage}>{error}</span>
            </div>}
            <div className={style.row}>
                <button type="submit" disabled={pristine || submitting}>Order</button>
                <NavLink to="/cart">
                    <ButtonMain buttonText={"В корзину"}/>
                </NavLink>
            </div>
        </form>
    )
};
export default reduxForm<I_orderFormData, I_Props>({form: 'order'})(OrderReduxForm)