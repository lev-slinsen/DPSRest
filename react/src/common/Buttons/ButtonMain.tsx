import React, {useEffect, useRef, useState} from 'react';
import classNames from "classnames/bind";
import style from "./Buttons.module.css";

interface IProps {
    onClickCallback?: () => void
    buttonText: string
}

function useTimeout(callback: any, delay: number) {
    const timeoutRef: any = React.useRef();
    const callbackRef = React.useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (typeof delay === 'number') {
            timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);

            // Clear timeout if the components is unmounted or the delay changes:
            return () => window.clearTimeout(timeoutRef.current);
        }
    }, [delay]);

    return timeoutRef;
}

const ButtonMain = ({
                        onClickCallback = () => {
                        }, buttonText
                    }: IProps) => {
    let [addSucces, setAddSucces] = useState(false);
    let timer: any = useRef(); //now you can pass timer to another component

    let onButtonClick = () => {
        onClickCallback();
        setAddSucces(true);
        timer.current = window.setTimeout(() => {
            setAddSucces(false);
        }, 500)

    };
    useEffect(() => {
        return () => { // Return callback to run on unmount.
            window.clearTimeout(timer);
        };
    }, []);

    let cx = classNames.bind(style);
    let classNameForbtnAdd = cx(style.btnAdd, {
        success: addSucces
    });
    return (
        <button className={classNameForbtnAdd}
                disabled={addSucces}
                onClick={onButtonClick}
        >{buttonText}
        </button>
    )
};

export default ButtonMain;