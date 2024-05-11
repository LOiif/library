import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import styles from './LoginForm.module.scss';
import {Link} from "react-router-dom";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);
    const emailHandler = (e) => {
        setEmail(e.target.value)
        store.setLoginError(null);
    }
    const passHandler = (e) => {
        setPassword(e.target.value)
        store.setLoginError(null);
    }
    const loginHandler = () => {
        store.login(email, password).then((e) => console.log(e))
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Вход в аккаунт</h2>
            <input
                className={store.loginError ? `${styles.input} ${styles.emailInput} ${styles.inputError}` : `${styles.input} ${styles.emailInput}`}
                onChange={emailHandler}
                value={email}
                type="text"
                placeholder='Почта'
            />
            <input
                onChange={passHandler}
                value={password}
                type="password"
                placeholder='Пароль'
                className={store.loginError ? `${styles.input} ${styles.passwordInput} ${styles.inputError}` : `${styles.input} ${styles.passwordInput}`}
            />

            {
                store.loginError
                    ? <p className={`${styles.errorMessage} ${styles.errorMessageActive}`}>

                        {store.loginError?.message}
                    </p>
                    : <p className={styles.errorMessage}>

                        {` `}
                    </p>
            }

            <button
                className={styles.loginButton}
                onClick={loginHandler}>
                Войти
            </button>

            <p className={styles.registrationText}>
                {`Нет аккаунта? `}
                <Link to={`/registration`} className={styles.registrationLink}>{`Зарегистрироваться`}</Link>
            </p>
            <p className={styles.logo}>easy-lib</p>

        </div>
    );
};

export default observer(LoginForm);
