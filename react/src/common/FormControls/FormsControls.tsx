import React, {InputHTMLAttributes} from 'react';
import {createTextMask} from 'redux-form-input-masks';
import classNames from 'classnames/bind';
import style from './FormControl.module.css';
import {Alert, Popover} from "antd";
import FormItem from "antd/lib/form/FormItem";

import Radio from "antd/lib/radio";
import Select from "antd/lib/select";

const Option = Select.Option;
const RadioGroup = Radio.Group;

export const phoneMask = createTextMask({
    pattern: '8-(099) 999-9999',
});

interface I_meta {
    touched: boolean,
    error: string | undefined,
    warning: string | undefined
    valid: any
}

interface I_renderFieldProps {
    input: any
    label: string
    type: string
    meta: I_meta
}

interface I_renderFormWrapperProps {
    label: string
    required: boolean
    meta: I_meta
    children: any
}

interface I_renderDropDownProps extends I_renderFieldProps {
    times: string[]
}

interface I_renderRadioProps extends I_renderFieldProps {
    values: string[]
}

export const ReduxFormWrapper = ({
                                     label, required,
                                     meta: {touched, error, warning, valid},
                                     children
                                 }: I_renderFormWrapperProps) => {
    let cx = classNames.bind(style);
    let classForField = cx(style.fieldWrapper, {
        success: touched && !error && !warning,
        error: error && touched,
    });
    const getValidateStatus = ({isTouched, error, warning, valid}: any) => {
        if (isTouched) {
            if (error) return "error";
            if (warning) return "warning";
            if (valid) return "success";
        }
        return undefined;
    };
    return (
        <FormItem
            label={label}
            validateStatus={getValidateStatus({touched, error, warning, valid})}
            required={true}
            className={classForField}
        >
            <Popover
                content={<Alert message={error} type="error"/>}
                visible={touched && error ? true : false}
                placement="rightTop">

                {children}
            </Popover>
        </FormItem>
    )
};

export const renderField = ({input, label, type, meta}: any) => {
    return (
        <ReduxFormWrapper required={true} label={label} meta={meta}>
            <input {...input} type={type}/>
        </ReduxFormWrapper>
    )
};

export const RenderTextarea = ({input, label, type, meta}: any, ...props: any) => {
    return (
        <ReduxFormWrapper required={false} label={label} meta={meta}>
            <textarea {...input} type={type}/>
        </ReduxFormWrapper>
    )
};
export const DropDownSelect = ({input, label, times, meta}: I_renderDropDownProps) => {
    const renderSelectOptions = (option: string, index: number) => (
        <Option key={option} value={index}>{option}</Option>
    );
    return (
        <ReduxFormWrapper required={true} label={label} meta={meta}>
            <Select
                {...input}
                onChange={value => value === undefined ? input.onChange(null) : input.onChange(value)}
                dropdownMatchSelectWidth={true}
            >
                <Option value={""}>Select</Option>
                {times.map(renderSelectOptions)}
            </Select>
        </ReduxFormWrapper>
    );
};

export const RadioButtonRender = ({input, label, values, meta}: I_renderRadioProps) => {
    const renderSelectOptions = (option: string, index: number) => (
        <Radio key={option} value={index}>{option}</Radio>
    );
    return (
        <ReduxFormWrapper required={true} label={label} meta={meta}>
            <RadioGroup {...input}>
                {values.map(renderSelectOptions)}
            </RadioGroup>
        </ReduxFormWrapper>
    );
};