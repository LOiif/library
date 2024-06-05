import React, {useCallback, useEffect, useState} from 'react';
import styles from './ProfilePage.module.scss'
import {store} from "../../index";
import {observer} from "mobx-react-lite";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import {useLocation, useNavigate} from "react-router-dom";
import {Triangle} from "react-loader-spinner";
import FileService from "../../services/FileService"
import ModalUploadFile from "../../components/ModalUploadFile/ModalUploadFile";
import BookService from "../../services/BookService";

const ProfilePage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [displayedBlock, setDisplayedBlock] = useState(location.state?.displayed || "mainInfo")
    const [favouritesBooks, setFavouritesBook] = useState([])
    const [block, setBlock] = useState(<></>)
    const [isLoading, setIsLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [updateUploads, setUpdateUploads] = useState(false)
    const [uploadsBooks, setUploadsBooks] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoading(true)
            store.checkAuth().then(() => {
                store.getFavourites(store.getUser().id).then((res) => {
                    setFavouritesBook(res)
                    BookService.getBooksUploadsByUserId(store.getUser().id).then((res) => {
                        setUploadsBooks(res.data)
                    })
                })

            }).finally(() => setIsLoading(false))
        }
    }, [])

    useEffect(() => {
        if(store.isAuth){
            setIsLoading(true)
            BookService.getBooksUploadsByUserId(store.getUser().id).then((res) => {
                setUploadsBooks(res.data)
            }).finally(() =>  setIsLoading(false))
        }
    }, [updateUploads])

    useEffect(() => {
        if (displayedBlock === 'mainInfo') {
            setBlock((
                <div>
                    <h2 className={styles.mainInfoTitle}>Основные данные: </h2>
                    <div className={styles.mainInfoContent}>
                        <div className={styles.infoContainer}>
                            <p className={styles.label}>{`Ваша почта: `}</p>
                            <p>{store.getUser().email}</p>
                        </div>

                        <div className={styles.infoContainer}>
                            <p className={styles.label}>{`Ваш id: `}</p>
                            <p>{store.getUser().id}</p>
                        </div>
                    </div>
                </div>
            ))
        } else if (displayedBlock === 'favourites') {
            setBlock((
                <div>
                    <h2 className={styles.mainInfoTitle}>Избранное: </h2>
                    <ul className={styles.bookList}>
                        <Triangle
                            visible={isLoading}
                            height="60"
                            width="60"
                            color="#000000"
                            ariaLabel="страница загружается"
                            wrapperClass={styles.loaderWrapper}
                        />
                        {
                            favouritesBooks.length > 0
                                ? favouritesBooks.map((book) =>
                                    <li className={styles.bookItem} key={book.id}>
                                        <Card bookInfo={book}></Card>
                                    </li>)
                                : <></>
                        }
                    </ul>
                </div>
            ))
        } else if (displayedBlock === 'load-books') {
            setBlock((
                <div>
                    <h2 className={styles.mainInfoTitle}> Загруженные книги:</h2>
                    <ul className={styles.bookList}>
                        <Triangle
                            visible={isLoading}
                            height="40"
                            width="40"
                            color="#000000"
                            ariaLabel="страница загружается"
                            wrapperClass={styles.loaderWrapper}
                        />

                        {
                            uploadsBooks.length > 0
                                ? uploadsBooks.map((book) =>
                                    <li className={styles.bookItem} key={book.id}>
                                        <Card bookInfo={book}></Card>
                                    </li>)
                                : <></>
                        }

                    </ul>
                    <button onClick={(e) => setShowModal(true)} className={styles.uploadButton}>Загрузить литературу
                    </button>
                </div>
            ))
        }

    }, [displayedBlock, isLoading, favouritesBooks, uploadsBooks, updateUploads])
    const logoutClickHandler = (e) => {
        store.logout().then(() => {
            navigate("/login")
        })
    }

    if (!store.isAuth) return (
        <>
            <Header></Header>
            <main className={styles.main}>
                <div className={styles.notAuth}>Вы не авторизованы (...</div>
            </main>
        </>
    )

    return (
        <>
            <Header></Header>
            <main className={styles.main}>
                <ul className={styles.navList}>
                    <li onClick={() => setDisplayedBlock('mainInfo')}
                        className={displayedBlock === "mainInfo" ? styles.navItem + " " + styles.navItemActive : styles.navItem}>Основная
                        информация
                    </li>
                    <li onClick={() => setDisplayedBlock('favourites')}
                        className={displayedBlock === "favourites" ? styles.navItem + " " + styles.navItemActive : styles.navItem}>Избранное
                    </li>
                    <li onClick={() => setDisplayedBlock('load-books')}
                        className={displayedBlock === "load-books" ? styles.navItem + " " + styles.navItemActive : styles.navItem}>Загрузка
                        книги
                    </li>
                    <div className={styles.buttonContainer}>
                        <button onClick={logoutClickHandler} className={styles.logoutButton}>Выйти из аккаунта</button>
                    </div>
                </ul>

                <div className={styles.block}>
                    {
                        block
                    }
                </div>
                <ModalUploadFile showModal={showModal} updateUploads={() => setUpdateUploads(!updateUploads)} closeModal={() => setShowModal(false)}></ModalUploadFile>
            </main>
        </>
    );
};

export default observer(ProfilePage);