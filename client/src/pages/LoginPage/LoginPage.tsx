import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {IUser} from "../../models/IUser";
import Header from "../../components/Header/Header";
import styles from "./LoginPage.module.scss";

const LoginPage: FC = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return (
            <>
                <Header/>
                <main className={styles.main}>
                    <LoginForm/>
                </main>
            </>
        );
    }

    return (
        <>
            <Header/>
            <main className={styles.main}>
                <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
                <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
                <button onClick={() => store.logout()}>Выйти</button>
                {users.map(user =>
                    <div key={user.email}>{user.email}</div>
                )}
            </main>
        </>
    );
};

export default observer(LoginPage);
