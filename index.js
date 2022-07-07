import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';


ReactDOM.render(
    <>
        <StateProvider initialState={initialState}
            reducer={reducer} >
            <App />
        </StateProvider>
    </>,
    document.getElementById('root')
);

