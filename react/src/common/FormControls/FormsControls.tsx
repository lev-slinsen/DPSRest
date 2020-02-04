import React, {InputHTMLAttributes} from 'react';
import {reduxForm} from 'redux-form';
import {createTextMask} from 'redux-form-input-masks';
import classNames from 'classnames/bind';
import style from './FormControl.module.css';
import {OrderReduxForm} from "./OrderForm";
import {Alert, Popover} from "antd";

export const phoneMask = createTextMask({
    pattern: '8-(099) 999-9999',
});

interface I_meta {
    touched: boolean,
    error: string | undefined,
    warning: string | undefined
}

interface I_renderFieldProps {
    input: InputHTMLAttributes<any>
    label: string
    type: string
    meta: I_meta
}

interface I_renderFormWrapperProps {
    label: string
    meta: I_meta
    children: any
}

interface I_renderDropDownProps extends I_renderFieldProps {
    times: string[]
}

export const ReduxFormWrapper = ({label, meta: {touched, error, warning}, children}: I_renderFormWrapperProps) => {
    let cx = classNames.bind(style);
    let classForField = cx(style.fieldWrapper, {
        success: touched && !error && !warning,
        error: error && touched,
    });
    return (
        <div className={classForField}>
            <label>{label}</label>
            <Popover
                content={<Alert message={error} type="error"/>}
                visible={touched && error ? true : false}
                placement="rightTop">

                {children}

            </Popover>
        </div>
    )
};

export const renderField = ({input, label, type, meta}: any) => {
    return (
        <ReduxFormWrapper label={label} meta={meta}>
            <input {...input} type={type}/>
        </ReduxFormWrapper>
    )
};

export const DropDownSelect = ({input, label, times, meta}: I_renderDropDownProps) => {
    const renderSelectOptions = (option: string, index: number) => (
        <option key={option} value={index}>{option}</option>
    );
    return (
        <ReduxFormWrapper label={label} meta={meta}>
            <select {...input}>
                <option value={""}>Select</option>
                {times.map(renderSelectOptions)}
            </select>
        </ReduxFormWrapper>
    );
};

export default reduxForm({form: 'order'})(OrderReduxForm)
