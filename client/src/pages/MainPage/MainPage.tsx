import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from './MainPage.module.scss';
import MyCarousel from "../../components/Carousel/Carousel";
import {observer} from "mobx-react-lite";
import {Triangle} from "react-loader-spinner";
import {store} from "../../index";

const MainPage = () => {

    const [mainBookData, setMainData] = useState([]);
    const [randomBookData, setRandomBookData] = useState([]);
    const [recommendationsData, setRecommendationsData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [bestData, setBestData] = useState([]);
    const [topData, setTopData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        store.getAllBooks().then((data) => {
            setRandomBookData(data.sort(() => Math.random() - 0.5))
            console.log(randomBookData[0])
        }).catch((e) => console.log(e)).finally(() => setIsLoading(false))
    }, []);

    useEffect(() => {
        setRecommendationsData(randomBookData.slice(20, 40))
        setMainData(randomBookData.slice(0, 15))
        setNewData(randomBookData.slice(40, 60))
        setBestData(randomBookData.slice(61, 80))
        setTopData(randomBookData.slice(81, 100))
    }, [randomBookData])



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
                <MyCarousel items={newData} title={"Новое на сайте"} size={1}/>
                <div className={styles.mb}></div>
                <MyCarousel items={topData} title={"Топ 10 книг за все время"} size={1}/>
                <div className={styles.mb}></div>
                <MyCarousel items={bestData} title={"Лучшее за месяц"} size={1}/>
            </main>
        </div>
    );
};

export default observer(MainPage);