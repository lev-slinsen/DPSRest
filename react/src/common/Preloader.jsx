import React from 'react';
import './../App.css'
import preloader from "../assets/images/Spinner.svg";

let Preloader = (props) => {
    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            width: '100%'
        }}>
            <img src={preloader}/>
        </div>
    );
};

export default Preloader;