import React from 'react';

import style from './FormControl.module.css';

import moment from 'moment';
import 'antd/dist/antd.css';
import locale from 'antd/es/date-picker/locale/ru_RU';
import DatePicker from "antd/lib/date-picker";
import createComponent from "./BaseComponent.tsx";


export const DatepickerRU: React.FC<any> = (props: any) => {
    const dates = ['2020-02-03', '2020-02-04', '2020-02-02'];

    const disabledDate = (current: any):boolean => {
        if (dates.indexOf(current.format('YYYY-MM-DD')) >= 0) {
            return true
        }
        return current && current < moment().endOf('day');
    };

    return (
            <DatePicker
                locale={locale}
                format="YYYY-MM-DD"
                defaultValue={moment().endOf('day')}
                disabledDate={disabledDate}
                showTime={false}
            />
    )
};

interface IDatePickerProps {
    label:string
    meta: any
}

export const renderDateTimePicker: React.FC<any> = ({ label, meta: {touched, error, warning}, ...props}:any) => {
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
            <DatepickerRU {...props}/>
            {touched &&
            ((error && <span className={style.errorMessage}>{error}</span>)
                || (warning && <span className={style.errorMessage}>{warning}</span>))}
        </div>
    </div>
)}



export const getValidateStatus = ({touched, error, warning, valid}:any) => {
    if (touched) {
        if (error) return "error";
        if (warning) return "warning";
        if (valid) return "success";
    }
    return undefined;
};



const valueToMoment = ({value, dateFormat}:any) => {
    if (value === undefined || value === null || value === "") {
        return undefined;
    }
    return moment(value, dateFormat);
};

// @ts-ignore
const mapError = ({meta: { touched, error, warning, valid } = {},
                      input: { ...inputProps },
                      ...props
                  }:any) => ({
    ...props,
    ...inputProps,
    validateStatus: getValidateStatus({touched, error, warning, valid}),
    help: touched && (error || warning)
});

export const customMap = (customPropsFun:any) => (props:any) => (
    [props].reduce(customPropsFun || (mappedProps => mappedProps), mapError(props))
);

const datePickerMapRU = customMap(
    (mapProps:any, {input: {onChange, value}, displayFormat, valueFormat}:any) => ({
        ...mapProps,
        onChange: (e:any, v:any) => {
            onChange(e.format(valueFormat));
        },
        value: valueToMoment(value),
        format: displayFormat
    })
);

export const DatePickerFieldRU = createComponent(DatePicker, datePickerMapRU);