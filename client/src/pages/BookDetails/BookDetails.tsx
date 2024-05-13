import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
import Header from "../../components/Header/Header";
import styles from "./BookDetails.module.scss"
import {ReactComponent as Heart} from "../../images/favourites.svg";
import {Context} from "../../index";
import Notification from "../../components/Notification/Notification";

const BookDetails = () => {
    const location = useLocation()
    const [showNotification, setShowNotification] = useState(false)
    const {store} = useContext(Context);
    const {bookInfo} = location.state
    const thumbnail = (bookInfo.volumeInfo.imageLinks && bookInfo.volumeInfo.imageLinks.smallThumbnail) || '';

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])
    const addFavourite = (e) => {

        if (store.isAuth){

             store.addFavourites(store.getUser().id, bookInfo.id)

        } else {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false)
            }, 3000)
        }
    }

    const closeNotification = (e) => {
        setShowNotification(false)
    }

    console.log(bookInfo)
    return (
        <>
            <Notification message={'Необходимо авторизоваться'} show={showNotification} closeNotification={closeNotification}></Notification>
            <Header/>
            <main className={styles.main}>
                <div className={styles.buttonContainer} onClick={addFavourite}>
                    <button className={styles.addToFav}>Добавить в избранное</button>
                    <Heart className={styles.heart}></Heart>
                </div>
                <span className={styles.line}/>
                <div className={styles.container}>
                    <img className={styles.img} src={thumbnail} alt={'Картинка кинги'}/>
                    <div className={styles.bookInfo}>
                        {
                            bookInfo.volumeInfo.title ?
                                <p className={styles.bookTitle}>{bookInfo.volumeInfo.title}</p>
                                : <></>
                        }

                        {
                            bookInfo.volumeInfo.authors.length !== 0 ?
                                <p className={styles.authors}>
                                    Авторы: {
                                    bookInfo.volumeInfo.authors.map((author, id) =>
                                        (id < bookInfo.volumeInfo.authors.length - 1)
                                            ? <span key={Date.now()}>{`${author}, `}</span>
                                            : <span key={Date.now()}>{author}</span>
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
                </div>
            </main>
        </>

    );
};

export default BookDetails;