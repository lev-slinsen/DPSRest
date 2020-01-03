import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {maxLength15, number, required} from "../../utils/validators";

import 'react-widgets/dist/css/react-widgets.css';
import style from './FormControl.module.css';

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

class DropDownSelect extends React.Component {

    renderSelectOptions = (option, index) => (
        <option key={option.name} value={index}>{option.name}</option>
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
                        {this.props.filters.map(this.renderSelectOptions)}
                    </select>
                    {touched &&
                    ((error && <span className={style.errorMessage}>{error}</span>)
                        || (warning && <span className={style.errorMessage}>{warning}</span>))}
                </div>
            </div>
        );
    }
}
const UploadFile = (props) => {
    let mainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.saveAvatar(e.target.files[0]);
        }
    };

    return (
        <div className={style.item}>
            Settings
            <div>
                {props.authorizedId&&<input onChange={mainPhotoSelected} type={"file"}/>}
            </div>
        </div>
    );
};

const AddPizzaReduxForm = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props;
    const filters = [{name: "Big"},{name: "All"}];
    return (
        <form className={style.formControl} onSubmit={handleSubmit}>
            <Field name="filter"
                   type="select"
                   component={DropDownSelect}
                   label="filters"
                   filters={filters}
                   validate={[number]}
                   warn={required}
            />
            <Field name="name"
                   type="text"
                   component={renderField}
                   label="name *"
                   validate={[required, maxLength15]}
            />
            {/*<Field name="photo"*/}
            {/*       type="text"*/}
            {/*       component={renderField}*/}
            {/*       label="photo"*/}
            {/*       validate={[required]}*/}
            {/*       warn={required}*/}
            {/*/>*/}
            <Field
                name="photo"
                type="file"
                component={renderField}
                label="photo"
            />
            <Field name="price"
                   type="number"
                   component={renderField}
                   label="price"
                   validate={[required, number]}
                   warn={required}
            />
            <Field name="size"
                   type="number"
                   component={renderField}
                   label="size"
                   validate={[required, number]}
                   warn={required}
            />
            <Field name="text_long"
                   type="text"
                   component={renderField}
                   label="text_long"
                   validate={[required]}
                   warn={required}
            />
            <Field name="text_short"
                   type="text"
                   component={renderField}
                   label="text_short"
                   validate={[required]}
                   warn={required}
            />

            <div>
                <button type="submit" disabled={submitting}>addPizza</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
};

export default reduxForm({form: 'addPizza'})(AddPizzaReduxForm)
