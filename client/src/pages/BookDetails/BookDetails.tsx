import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
import Header from "../../components/Header/Header";
import styles from "./BookDetails.module.scss"
import {ReactComponent as HeartSvg} from "../../images/favourites.svg";
import deleteIcon from "../../images/deleteIcon.svg";
import {Context} from "../../index";
import Notification from "../../components/Notification/Notification";
import {observer} from "mobx-react-lite";
import BookService from "../../services/BookService";
import {Triangle} from "react-loader-spinner";

const BookDetails = () => {
    const {store} = useContext(Context);
    const location = useLocation()
    const [showNotification, setShowNotification] = useState(false)
    const [bookInfo, setBookInfo] = useState(location.state.bookInfo)
    const thumbnail = (bookInfo?.volumeInfo?.imageLinks && bookInfo?.volumeInfo?.imageLinks?.smallThumbnail) || '';
    const [isFavourite, setIsFavourite] = useState(false)
    const [timeOutId, setTimeoutId] = useState(null);
    const [commentMessage, setCommentMessage] = useState('');
    const [showSendButton, setShowSendButton] = useState(false)
    const [comments, setComments] = useState([])

    useEffect(() => {
        console.log(location)
        if (!bookInfo) {
            const bookId = location.pathname.split('/').reverse()[0]
            BookService.getBookById(bookId).then((data1) => {
                console.log(data1)
                setBookInfo(data1)
            }).catch((err) => console.log(err))
        }

    }, [])

    useEffect(() => {
        if (bookInfo) {
            store.getComments(bookInfo.id).then((res) => {
                if (res) setComments(res)
            })

            if (localStorage.getItem('token')) {
                store.checkAuth()
                    .then(() => {
                        if (store.isAuth) {
                            store.findFavourite(store.getUser().id, bookInfo.id).then((res) => {
                                setIsFavourite(res)
                                console.log(store)
                            })
                        }
                    })
            }
        }
    }, [bookInfo])

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

    useEffect(() => {
        setShowSendButton(commentMessage !== '')
    }, [commentMessage])

    const commentMessageHandler = (e) => {
        setCommentMessage(e.target.value)
    }
    const addFavourite = (e) => {
        if (store.isAuth) {
            setIsFavourite(!isFavourite)
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

    const deleteComment = (e) => {
        const commentId = e.target.closest(`.${styles.commentContainer}`).id;
        store.deleteComment(bookInfo.id, commentId).then((res) => {
            console.log(res)
            setComments(res)
        })
    }
    const sendComment = (e) => {
        if (commentMessage !== '') {
            store.postComment(store.getUser().id, bookInfo.id, commentMessage).then(() => {
                store.getComments(bookInfo.id).then(res => setComments(res))
            });
            setCommentMessage('')
        }
    }
    const closeNotification = (e) => {
        setShowNotification(false)
    }

    if (store.isLoading || !bookInfo) {
        return (
            <>
                <Header/>
                <Triangle
                    visible={true}
                    height="60"
                    width="60"
                    color="#000000"
                    ariaLabel="страница загружается"
                    wrapperClass={styles.loaderWrapper}
                />)
            </>
        )
    }

    return (
        <>
            <Notification message={'Необходимо авторизоваться'} show={showNotification}
                          closeNotification={closeNotification}></Notification>
            <Header/>
            <main className={styles.main}>

                <span className={styles.line}/>
                <div className={styles.container}>
                    <div>
                        <img className={styles.img} src={thumbnail} alt={'Картинка кинги'}/>
                        <a href={bookInfo?.saleInfo?.buyLink} target={"_blank"} className={styles.readLink}>Читать</a>
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.bookInfo}>
                            <div className={styles.infoHeader}>
                                {
                                    bookInfo?.volumeInfo.title ?
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
                                bookInfo?.volumeInfo.authors.length !== 0 ?
                                    <p className={styles.authors}>
                                        Авторы: {
                                        bookInfo?.volumeInfo.authors.map((author, id) =>
                                            (id < bookInfo?.volumeInfo.authors.length - 1)
                                                ? <span key={author}>{`${author}, `}</span>
                                                : <span key={author}>{author}</span>
                                        )
                                    }
                                    </p>
                                    : <></>
                            }

                            <p className={styles.description}>{bookInfo.volumeInfo.description}</p>

                        </div>
                        <div className={styles.comments}>
                            <h3 className={styles.commentsTitle}>Комментарии{comments.length > 0 ? ` ${comments.length}` : ''}</h3>
                            {
                                store.isAuth
                                    ? <div className={styles.commentsInputContainer}>
                                        <textarea
                                            placeholder={"Комментарий..."}
                                            value={commentMessage}
                                            className={styles.commentsInput}
                                            onChange={commentMessageHandler}
                                        />
                                        <div className={styles.buttonContainer}>
                                            <button onClick={sendComment}
                                                    className={showSendButton ? styles.sendButton : styles.hidden}>Отправить
                                            </button>
                                        </div>
                                    </div>

                                    : <p className={styles.notAuthMessage}>Авторизуйтесь, чтобы оставить комментарий</p>
                            }

                            {
                                store.isAuth
                                    ? comments.map((item) =>
                                        <div key={item.commentId} id={item.commentId}
                                             className={item.userId === store.getUser().id
                                                 ? styles.commentContainer + ' ' + styles.currentCommentContainer
                                                 : styles.commentContainer}
                                        >
                                            <p className={styles.commentsUserId}>{`@` + item.userId}</p>
                                            <p className={styles.comment}>{item.comment}</p>
                                            <button className={styles.deleteComment}
                                                    onClick={deleteComment}
                                                    style={{backgroundImage: `url(${deleteIcon})`}}
                                            >
                                                Удалить
                                            </button>
                                        </div>)
                                    : <></>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default observer(BookDetails);