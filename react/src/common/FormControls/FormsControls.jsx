import React from 'react'
import {Field, reduxForm} from 'redux-form'
import style from './FormControl.module.css'
import {aol, email, maxLength15, number, required, tooOld} from "../../utils/validators";
import {createTextMask} from 'redux-form-input-masks';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
// import moment from 'moment';
// import momentLocaliser from 'react-widgets/lib/localizers/moment';
import 'react-widgets/dist/css/react-widgets.css';

const phoneMask = createTextMask({
    pattern: '8-(099) 999-9999',
});

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <label>{label}</label>
        <div className={style.fieldWrapper + ' ' + (error && touched ? style.error : '')}>
            <input {...input} placeholder={label} type={type}/>
            {touched &&
            ((error && <span className={style.errorMessage}>{error}</span>)
                || (warning && <span className={style.errorMessage}>{warning}</span>))}
        </div>
    </div>
);

const renderDateTimePicker = ({input: {onChange, value}, showTime}) =>
    <DateTimePicker
        onChange={onChange}
        format="DD MMM YYYY"
        time={showTime}
        value={!value ? null : new Date(value)}
    />

class DropDownSelect extends React.Component {

    renderSelectOptions = (option, index) => (
        <option key={option} value={index}>{option}</option>
    );

    render() {
        const {meta: {touched, error, warning}} = this.props;
        const {input, label} = this.props;
        return (
            <div>
                <label>{label}</label>
                <div className={style.fieldWrapper}>
                    <select {...input}>
                        <option value="">Select</option>
                        {this.props.times.map(this.renderSelectOptions)}
                    </select>
                    {touched &&
                    ((error && <span className={style.errorMessage}>{error}</span>)
                        || (warning && <span className={style.errorMessage}>{warning}</span>))}
                </div>
            </div>
        );
    }
}


const OrderReduxForm = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props;
    const times = ['', '10', '11', '12'];
    return (
        <form className={style.formControl} onSubmit={handleSubmit}>

            <Field name="phone"
                   type="text"
                   component={renderField}
                   {...phoneMask}
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
            <Field name="delivery_date"
                   type="date"
                   component={renderField}
                   label="date"
                   validate={[required]}
                   warn={required}
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
