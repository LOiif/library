import React from 'react';
import './styles/global.scss';
import './App.scss';
import MainPage from "./pages/MainPage/MainPage";
import {observer} from "mobx-react-lite";

function App() {
    return (
        <div className="App">
            <MainPage/>
        </div>
    );
}

export default observer(App);