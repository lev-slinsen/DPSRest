import React from 'react';
import './App.css';
import Main from "./Components/Main";
import store from "./Redux/Store";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";

function App() {

    return (
        <div className="App">
            <HashRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <Main/>
            </Provider>
            </HashRouter>
        </div>
    );
}

export default App;
