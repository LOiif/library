import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {IUser} from "../../models/IUser";
import Header from "../../components/Header/Header";
import styles from "./LoginPage.module.scss";
import {useNavigate} from "react-router-dom";
import {Triangle} from "react-loader-spinner";
import Footer from "../../components/Footer/Footer";

const LoginPage: FC = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return (
            <>
            <Header/>
            <main className={styles.main}>
                <Triangle visible={true}
                          height="60"
                          width="60"
                          color="#000000"
                          ariaLabel="страница загружается"
                          wrapperClass={styles.loaderWrapper}/>
            </main>
                <Footer/>
        </>
        );
    }

    if (!store.isAuth) {
        return (
            <>
                <Header/>
                <main className={styles.main}>
                    <LoginForm/>
                </main>
                <Footer/>
            </>
        );
    } else {
        navigate("/")
    }
};

export default observer(LoginPage);
