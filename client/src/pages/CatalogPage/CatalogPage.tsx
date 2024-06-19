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
    const [searchBy, setSearchBy] = useState('intitle')
    const [format, setFormat] = useState('ebooks')
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

    const changeSearchByInput = (e) => {
        setSearchBy(e.target.value)
        console.log(searchBy)
    }

    const changeFormatInput = (e) => {
        setFormat(e.target.value)
        console.log(format)
    }

    const filterClickHandler = (e) => {
        Promise.all([
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=${searchBy}:${inputSearchQuery}&filter=${format}&key=${GOOGLE_API_KEY}&maxResults=${maxResults}&langRestrict=ru`),
        ]).then(([data1]) => {
            console.log(data1.items)
            setBooksData(data1.items)
            setIsLoading(false)
        }).catch((err) => console.log(err))
    }

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
                <div className={styles.mainContainer}>
                    <div className={styles.searchContainer}>
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
                    </div>

                    <div className={styles.filtersContainer}>
                        <h2 className={styles.filtersTitle}>Фильтры</h2>
                        <fieldset className={styles.searchByFieldset}>
                            <legend className={styles.searchByLegend}>Искать по:</legend>
                            <div className={styles.searchByItem}>
                                <input className={styles.radio} id={"intitle"} type="radio" name={'searchBy'}
                                       onChange={changeSearchByInput} value={"intitle"}
                                       checked={searchBy === 'intitle'}/>
                                <label htmlFor="intitle">Названию</label>
                            </div>
                            <div className={styles.searchByItem}>
                                <input className={styles.radio} id={"author"} type="radio" name={'searchBy'}
                                       onChange={changeSearchByInput} value={"author"} checked={searchBy === 'author'}/>
                                <label htmlFor="author">Автору</label>
                            </div>
                        </fieldset>

                        <fieldset className={styles.formatFieldset}>
                            <legend className={styles.formatLegend}>Формат книг</legend>
                            <div className={styles.formatItem}>
                                <input className={styles.radio} id={"ebooks"} type="radio" name={'format'}
                                       value={"ebooks"} onChange={changeFormatInput} checked={format === 'ebooks'}/>
                                <label htmlFor="ebooks">Электронные</label>
                            </div>
                            <div className={styles.formatItem}>
                                <input className={styles.radio} id={"free-ebooks"} type="radio" name={'format'}
                                       value={"free-ebooks"} onChange={changeFormatInput}
                                       checked={format === 'free-ebooks'}/>
                                <label htmlFor="ebooks">Бесплатные</label>
                            </div>
                            <div className={styles.formatItem}>
                                <input className={styles.radio} id={"paid-ebooks"} type="radio" name={'format'}
                                       value={"paid-ebooks"} onChange={changeFormatInput}
                                       checked={format === 'paid-ebooks'}/>
                                <label htmlFor="author">Платные</label>
                            </div>
                        </fieldset>
                        <button className={styles.filterButton} onClick={filterClickHandler}>Применить</button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default observer(CatalogPage);