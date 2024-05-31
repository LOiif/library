import React, {FC, useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from "./CatalogPage.module.scss"
import axios from "axios";
import {GOOGLE_API_KEY} from "../../http";
import Card from "../../components/Card/Card";
import {Triangle} from "react-loader-spinner";
import {useLocation} from "react-router-dom";
import {ReactComponent as RightArrowSvg} from "../../images/arrow_right.svg";
import {observer} from "mobx-react-lite";

const CatalogPage: FC<any> = () => {
    const location = useLocation()
    const [inputSearchQuery, setInputSearchQuery] = useState(location.state?.searchQuery || '')
    const [booksData, setBooksData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    let maxResults = inputSearchQuery === '' ? 40 : 27

    const fetchData = uri => axios.get(uri).then(({data}) => data);

    useEffect(() => {
        setIsLoading(true)
        Promise.all([
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:${inputSearchQuery}&key=${GOOGLE_API_KEY}&maxResults=${maxResults}&langRestrict=ru`),
        ]).then(([data1]) => {
            console.log(data1.items)
            setBooksData(data1.items)
            setIsLoading(false)
        }).catch((err) => console.log(err))

    }, [])
    const clickSearchButton = (e) => {
        setIsLoading(true)
        Promise.all([
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:${inputSearchQuery}&key=${GOOGLE_API_KEY}&maxResults=${maxResults}&langRestrict=ru`),
        ]).then(([data1]) => {
            console.log(data1.items)
            setBooksData(data1.items)
            setIsLoading(false)
        }).catch((err) => console.log(err))
    }

    const changeInputHandler = (e) => {
        setInputSearchQuery(e.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            clickSearchButton(event)
        }
    };

    if (isLoading) {
        return <>
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
    }

    return (
        <>
            <Header/>
            <main className={styles.main}>
                <div className={styles.searchHeader}>
                    <input type="text"
                           className={styles.searchInput}
                           value={inputSearchQuery}
                           onChange={changeInputHandler}
                           onKeyUp={handleKeyPress}
                           placeholder={'Введите запрос...'}
                    />
                    <button
                        className={styles.searchButton}
                        onClick={clickSearchButton}
                    >
                        Поиск
                        <i><RightArrowSvg/></i>
                    </button>
                </div>
                <ul className={styles.bookList}>
                    {
                        booksData
                            ? booksData.map(book =>
                                book?.volumeInfo?.imageLinks
                                    ? (<li className={styles.bookItem} key={book.id}>
                                            <Card bookInfo={book}/>
                                        </li>)
                                    : <></>)
                            : <div className={styles.errorMessage}>Ничего не найдено...</div>
                    }
                </ul>
            </main>
        </>
    );
};

export default observer(CatalogPage);