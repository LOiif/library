import React, {useState} from 'react';
import { useLocation } from 'react-router-dom'
import Header from "../../components/Header/Header";
import styles from "./BookDetails.module.scss"

const BookDetails = () => {
    const location = useLocation()
    const { bookInfo } = location.state

    const thumbnail = (bookInfo.volumeInfo.imageLinks && bookInfo.volumeInfo.imageLinks.smallThumbnail) || '';

    console.log(bookInfo)
    return (
        <>
            <Header/>
            <main className={styles.main}>
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