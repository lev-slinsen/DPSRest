import style from "./FormControl.module.css";
import {Field} from "redux-form";
import {maxLength100, maxLength15, minLength10, minLength3, number, required} from "../../utils/validators";
import {RenderDateTimePicker} from "./DatePicker";
import React from "react";
import {DropDownSelect, phoneMask, renderField} from "./FormsControls";

export const OrderReduxForm = ({handleSubmit, pristine, reset, submitting, error}: any) => {
    const times = ['09', '10', '11', '12'];
    const dates = ['2020-02-23', '2020-02-24', '2020-02-22'];


    return (
        <form className={style.formControl} onSubmit={handleSubmit}>

            <Field name="phone"
                   type="text"
                // @ts-ignore
                   label="Номер телефона *"
                   component={renderField}
                   {...phoneMask}
                   validate={[required, number]}
            />
            <Field name="first_name"
                   type="text"
                   component={renderField}
                   label="Имя *"
                   validate={[required, minLength3, maxLength15]}
            />
            <Field name="delivery_date"
                   component={RenderDateTimePicker}
                   label="Дата доставки заказа *"
                   dates={dates}
                   validate={[required]}
            />
            <Field name="delivery_time"
                   type="select"
                   component={DropDownSelect}
                   label="Время доставки *"
                   times={times}
                   validate={[required]}
            />
            <Field name="address"
                   type="text"
                   component={renderField}
                   label="Адрес доставки *"
                   validate={[required, minLength10, maxLength100]}
            />
            <div className={style.fieldWrapper}>
                <label>comment</label>
                <Field name="comment"
                       type="text"
                       component="textarea"
                       label="Комментарий"
                       validate={[maxLength100]}
                />
            </div>
            <div>
                <label>Форма оплаты *</label>
                <div className={style.row}>
                    <label><Field name="payment" component="input" type="radio" value="0"/> cash</label>
                    <label><Field name="payment" component="input" type="radio" value="1"/> card</label>
                    <label><Field name="payment" component="input" type="radio" value="3"/> online</label>
                </div>
            </div>

            {error && <div>
                <span className={style.errorMessage}>{error}</span>
            </div>}
            <div>
                <button type="submit" disabled={pristine || submitting}>Order</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
};