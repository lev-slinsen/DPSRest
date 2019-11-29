import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { number, required} from "../../utils/validators";
import {createTextMask} from 'redux-form-input-masks';
import {renderDateTimePicker} from "./DatePicker";

import 'react-widgets/dist/css/react-widgets.css';
import style from './FormControl.module.css';

const phoneMask = createTextMask({
    pattern: '8-(099) 999-9999',
});

interface IrenderFieldProps {
    input:any
    label: string
    type: string
    meta: any
}
const renderField = ({input, label, type, meta: {touched, error, warning}}:IrenderFieldProps) => {
    let classForField = () => {
        if(touched) {
            return style.fieldWrapper + ' ' + (error && touched ? style.error : style.success)
        } else {
            return style.fieldWrapper;
        }
    };
    return (
    <div>
        <label>{label}</label>
        <div className={classForField()}>
            <input {...input} placeholder={label} type={type}/>
            {touched &&
            ((error && <span className={style.errorMessage}>{error}</span>)
                || (warning && <span className={style.errorMessage}>{warning}</span>))}
        </div>
    </div>
)};



class DropDownSelect extends React.Component {

    renderSelectOptions = (option: string, index: number) => (
        <option key={option} value={index}>{option}</option>
    );

    render() {
        const {meta: {touched, error, warning}}:any = this.props;
        const {input, label, times}:any = this.props;
        return (
            <div>
                <label>{label}</label>
                <div className={style.fieldWrapper}>
                    <select {...input}>
                        <option value="">Select</option>
                        {times.map(this.renderSelectOptions)}
                    </select>
                    {touched &&
                    ((error && <span className={style.errorMessage}>{error}</span>)
                        || (warning && <span className={style.errorMessage}>{warning}</span>))}
                </div>
            </div>
        );
    }
}


const OrderReduxForm = (props:any) => {
    const {handleSubmit, pristine, reset, submitting} = props;
    const times = ['', '10', '11', '12'];

    return (
        <form className={style.formControl} onSubmit={handleSubmit}>

            <Field name="phone"
                   type="text"
                   component={renderField}
                   {...phoneMask}
                // @ts-ignore
                   label="Номер телефона *"
                   validate={[required, number]}
            />
            <Field name="first_name"
                   type="text"
                   component={renderField}
                   label="Name"
                   validate={[required]}
                   warn={required}
            />
            <Field
                name="delivery_date"
                showTime={false}
                component={renderDateTimePicker}
                validate={[required]}
                warn={required}
                label="Дата Заказа"
            />
            <Field name="delivery_time"
                   type="select"
                   component={DropDownSelect}
                   label="time"
                   times={times}
                   validate={[number]}
                   warn={required}
            />
            <Field name="address"
                   type="text"
                   component={renderField}
                   label="address"
                   validate={[required]}
                   warn={required}
            />
            <div className={style.fieldWrapper}>
                <label>comment</label>
                <Field name="comment"
                       type="text"
                       component="textarea"
                       label="comment"
                       validate={[]}
                />
            </div>
            <div>
                <label>payment</label>
                <div className={style.row}>
                    <label><Field name="payment" component="input" type="radio" value="0"/> cash</label>
                    <label><Field name="payment" component="input" type="radio" value="1"/> card</label>
                    <label><Field name="payment" component="input" type="radio" value="3"/> online</label>
                </div>
            </div>

            {props.error && <div>
                <span className={style.error}>{props.error}</span>
            </div>}
            <div>
                <button type="submit" disabled={submitting}>Order</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
};

export default reduxForm({form: 'order'})(OrderReduxForm)
