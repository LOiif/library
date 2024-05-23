import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from './MainPage.module.scss';
import axios from "axios";
import MyCarousel from "../../components/Carousel/Carousel";
import {observer} from "mobx-react-lite";
import {GOOGLE_API_KEY} from "../../http";
import {Triangle} from "react-loader-spinner";

const MainPage = () => {

    const [mainBookData, setMainData] = useState([]);
    const [recommendationsData, setRecommendationsData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [bestData, setBestData] = useState([]);
    const [topData, setTopData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = uri => axios.get(uri).then(({data}) => data);
    useEffect(() => {
        setIsLoading(true)
        Promise.all([
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Одноэтажная+Америка&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Война+и+мир+лев+толстой&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Тихий+дон&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Двенадцать+стульев&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Дюна&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
        ]).then(([data1, data2, data3, data4, data5]) => {
            console.log(data1.items)
            setMainData([...data1.items, ...data2.items, ...data3.items, ...data4.items, ...data5.items]
                .filter((el) => el?.volumeInfo?.imageLinks))
        }).catch((err) => console.log(err))

        Promise.all([
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Тайная+жизнь+пчёл&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Замок+из+стекла&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Десять+негритят&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Возлюбленная&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Одиссея&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Чужестранка&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=inauthor:Достоевский&key=${GOOGLE_API_KEY}&maxResults=4&langRestrict=ru`),
        ]).then(([data1, data2, data3, data4, data5, data6, data7]) => {
            setRecommendationsData([...data1.items, ...data2.items, ...data3.items, ...data4.items, ...data5.items, ...data6.items, ...data7.items]
                .filter((el) => el?.volumeInfo?.imageLinks))
        }).catch((err) => console.log(err)).finally(() => setIsLoading(false))
    }, []);


    if (isLoading) {
        return <>
            <Header/>
            <main className={styles.main}>
                <Triangle
                    visible={true}
                    height="60"
                    width="60"
                    color="#000000"
                    ariaLabel="страница загружается"
                    wrapperClass={styles.loaderWrapper}
                />
            </main>
        </>
    }

    return (
        <div>
            <Header/>
            <main className={styles.main}>
                <MyCarousel items={mainBookData} title={""} size={2}/>
                <div className={styles.mb}></div>
                <MyCarousel items={recommendationsData} title={"Рекомендации для вас"} size={1}/>
                <div className={styles.mb}></div>
                <MyCarousel items={recommendationsData} title={"Новое на сайте"} size={1}/>
                <div className={styles.mb}></div>
                <MyCarousel items={recommendationsData} title={"Топ 10 книг за все время"} size={1}/>
                <div className={styles.mb}></div>
                <MyCarousel items={recommendationsData} title={"Лучшее за месяц"} size={1}/>
            </main>
        </div>
    );
};

export default observer(MainPage);