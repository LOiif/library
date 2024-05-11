import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import styles from './RegistrationForm.module.scss';
import {Link} from "react-router-dom";

const RegistrationForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rePassword, setRePassword] = useState<string>('')
    const {store} = useContext(Context);
    const [emailError, setEmailError] = useState({e: false, message: ''});
    const [passError, setPassError] = useState({e: false, message: ''});
    const [rePassError, setRePassError] = useState({e: false, message: ''});
    useEffect(() => {
        if (store.registrationError) {
            if (store.registrationError.errors[0]) {
                if (store.registrationError?.errors[0]?.path === 'email') {
                    setEmailError({e: true, message: 'Неправильный формат почты'});
                } else {
                    setPassError({e: true, message: 'Пароль должен содержать мин. 5 символов'});
                }

                if (store.registrationError.errors[1]) {
                    if (store.registrationError.errors[1].path === 'password') {
                        setPassError({e: true, message: 'Пароль должен содержать мин. 5 символов'});
                    } else {
                        setEmailError({e: true, message: 'Неправильный формат почты'});
                    }
                }

            } else if (store.registrationError.message) {
                setEmailError({e: true, message: 'Пользователь с такой почтой уже существует'});
            }
        } else {
            setEmailError({e: false, message: ''})
            setPassError({e: false, message: ''})
        }
        console.log(store.registrationError)
        console.log(emailError)
    }, [store.registrationError])

    useEffect(() => {
        if (rePassword.localeCompare(password) !== 0) {
            setRePassError({e: true, message: 'Пароли должны совпадать'})
        } else {
            setRePassError({e: false, message: ''})
        }
    }, [rePassword, password])


    const emailHandler = (e) => {
        setEmail(e.target.value)
        setEmailError({e: false, message: ''})
    }
    const passHandler = (e) => {
        setPassword(e.target.value)
        setPassError({e: false, message: ''})
    }
    const rePassHandler = (e) => {
        setRePassword(e.target.value)
    }

    const registrationHandler = () => {
        if (!rePassError.e) {
            store.registration(email, password)
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Регистрация</h2>
            <input
                className={emailError.e ? `${styles.input} ${styles.emailInput} ${styles.inputError}` : `${styles.input} ${styles.emailInput}`}
                onChange={emailHandler}
                value={email}
                type="text"
                placeholder='Почта'
            />
            {
                emailError.e
                    ? <p className={`${styles.errorMessage} ${styles.errorMessageActive}`}>

                        {emailError.message}
                    </p>
                    : <p className={`${styles.errorMessage}`}>
                        {`   `}
                    </p>
            }
            <input
                onChange={passHandler}
                value={password}
                type="password"
                placeholder='Пароль'
                className={passError.e ? `${styles.input} ${styles.passwordInput} ${styles.inputError}` : `${styles.input} ${styles.passwordInput}`}
            />
            {
                passError.e
                    ? <p className={`${styles.errorMessage} ${styles.errorMessageActive}`}>

                        {passError.message}
                    </p>
                    : <p className={`${styles.errorMessage}`}>
                        {`   `}
                    </p>
            }
            <input
                onChange={rePassHandler}
                value={rePassword}
                type="password"
                placeholder='Подтвердите пароль'
                className={rePassError.e ? `${styles.input} ${styles.rePasswordInput} ${styles.inputError}` : `${styles.input} ${styles.rePasswordInput}`}
            />

            {
                rePassError.e
                    ? <p className={`${styles.errorMessage} ${styles.errorMessageActive}`}>

                        {rePassError.message}
                    </p>
                    : <p className={`${styles.errorMessage}`}>
                        {`   `}
                    </p>
            }
            <button
                className={styles.registrationButton}
                onClick={registrationHandler}>
                Регистрация
            </button>
            <p className={styles.loginText}>
                {`Уже есть аккаунт? `}
                <Link to={`/login`} className={styles.loginLink}>{`Войти`}</Link>
            </p>
            <p className={styles.logo}>easy-lib</p>
        </div>
    );
};

export default observer(RegistrationForm);
