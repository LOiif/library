import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {router} from "./Routes/Routes";
import Store from "./store/store";

interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <Context.Provider value={{
            store
        }}>
            <RouterProvider router={router}/>
        </Context.Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
