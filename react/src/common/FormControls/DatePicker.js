import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';
import style from './FormControl.module.css';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';

export class DatepickerRU extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            selectedDay: undefined,
        };
    }
    handleDayChange(day) {
        this.setState({ selectedDay: day });
    }

    render() {
     //   const { meta: { touched, error } } = this.props.field;
        const { selectedDay } = this.state;
        const past = {
            before: new Date(),
        }
        const weekends = {
            daysOfWeek: [0, 6],
        };


        function isFirstOfMonth(day) {
            return day.getDate() === 25;
        }
        return (
            <div>
            <div>
                <DayPickerInput
                    inputProps={{...this.props}}
                    onDayChange={this.handleDayChange}
                    dayPickerProps={{
                        locale: 'ru',
                        localeUtils: MomentLocaleUtils,
                        modifiers: {
                            disabled: [past, weekends, isFirstOfMonth ],
                        }
                    }}
                />
            </div>
            </div>
        );
    }
}

export const renderDateTimePicker = ({ label, meta: {touched, error, warning}, ...props}) => (
    <div>
        <label>{label}</label>
        <div className={style.fieldWrapper + ' ' + (error && touched ? style.error : '')}>
            <DatepickerRU {...props}/>
            {touched &&
            ((error && <span className={style.errorMessage}>{error}</span>)
                || (warning && <span className={style.errorMessage}>{warning}</span>))}
        </div>
    </div>
)