import React, {useContext, useEffect, useId, useState} from 'react';
import {useLocation} from 'react-router-dom'
import Header from "../../components/Header/Header";
import styles from "./BookDetails.module.scss"
import {ReactComponent as HeartSvg} from "../../images/favourites.svg";
import {Context} from "../../index";
import Notification from "../../components/Notification/Notification";
import {randomBytes} from "crypto";
import {observer} from "mobx-react-lite";
import {log} from "util";

const BookDetails = () => {
    const {store} = useContext(Context);
    const location = useLocation()
    const [showNotification, setShowNotification] = useState(false)
    const {bookInfo} = location.state
    const thumbnail = (bookInfo.volumeInfo.imageLinks && bookInfo.volumeInfo.imageLinks.smallThumbnail) || '';
    const [isFavourite, setIsFavourite] = useState(false)
    const [timeOutId, setTimeoutId] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
                .then(() => {
                    if (store.isAuth) {
                        return store.findFavourite(store.getUser().id, bookInfo.id)
                    }
                })
                .then((res) => {
                setIsFavourite(res)
            })
        }
    }, [])

    useEffect(() => {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
        if (showNotification === true) {
            setTimeoutId(setTimeout(() => {
                setShowNotification(false)
            }, 3000))
        }
    }, [showNotification])
    const addFavourite = (e) => {
        setIsFavourite(!isFavourite)
        if (store.isAuth && store.user.isActivated) {
            store.changeFavouriteStatus(store.getUser().id, bookInfo.id)
        } else {
            if (timeOutId) {
                clearTimeout(timeOutId);
            }
            setShowNotification(true);
            setTimeoutId(setTimeout(() => {
                setShowNotification(false)
            }, 3000))
        }
    }
    const closeNotification = (e) => {
        setShowNotification(false)
    }

    if (store.isLoading) return <div>loading</div>
    return (
        <>
            <Notification message={'Необходимо авторизоваться'} show={showNotification}
                          closeNotification={closeNotification}></Notification>
            <Header/>
            <main className={styles.main}>

                <span className={styles.line}/>
                <div className={styles.container}>
                    <img className={styles.img} src={thumbnail} alt={'Картинка кинги'}/>
                    <div className={styles.contentContainer}>
                        <div className={styles.bookInfo}>
                            <div className={styles.infoHeader}>
                                {
                                    bookInfo.volumeInfo.title ?
                                        <p className={styles.bookTitle}>{bookInfo.volumeInfo.title}</p>
                                        : <></>
                                }
                                <button className={styles.addToFavButton} onClick={addFavourite}>
                                    Добавить в избранное
                                    <span className={styles.favIcon}><HeartSvg
                                        className={isFavourite ? styles.favSvgFill + " " + styles.favSvg : styles.favSvg}></HeartSvg></span>
                                </button>
                            </div>
                            {
                                bookInfo.volumeInfo.authors.length !== 0 ?
                                    <p className={styles.authors}>
                                        Авторы: {
                                        bookInfo.volumeInfo.authors.map((author, id) =>
                                            (id < bookInfo.volumeInfo.authors.length - 1)
                                                ? <span key={author}>{`${author}, `}</span>
                                                : <span key={author}>{author}</span>
                                        )
                                    }
                                    </p>
                                    : <></>
                            }
                            {
                                bookInfo.volumeInfo.description ?
                                    <p className={styles.description}>{bookInfo.volumeInfo.description}</p>
                                    : <></>
                            }
                        </div>
                        <div className={styles.comments}>
                            <h3 className={styles.commentsTitle}>Отзывы 1</h3>
                            {
                                store.isAuth && store.user?.isActivated
                                    ? <textarea className={styles.commentsInput}/>
                                    : <p className={styles.notAuthMessage}>Авторизуйтесь, чтобы оставить комментарий</p>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>

    );
};

export default observer(BookDetails);