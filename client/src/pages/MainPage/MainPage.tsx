import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import './MainPage.scss';
import axios from "axios";
import MyCarousel from "../../components/Carousel/Carousel";
import {observer} from "mobx-react-lite";
import {GOOGLE_API_KEY} from "../../http";

const MainPage = () => {

    const [mainBookData, setMainData] = useState([]);
    const [recommendationsData, setRecommendationsData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [bestData, setBestData] = useState([]);
    const [topData, setTopData] = useState([]);

    const fetchData = uri => axios.get(uri).then(({data}) => data);
    useEffect(() => {
        Promise.all([
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Одноэтажная+Америка&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Война+и+мир+лев+толстой&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Тихий+дон&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Двенадцать+стульев&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Дюна&key=${GOOGLE_API_KEY}&maxResults=1&langRestrict=ru`),
        ]).then(([data1, data2, data3, data4, data5]) => {
            setMainData([...data1.items, ...data2.items, ...data3.items, ...data4.items, ...data5.items, ...data5.items, ...data5.items])
        }).catch((err) => console.log(err))

        Promise.all([
            fetchData(`https://www.googleapis.com/books/v1/volumes?q=intitle:Война+и+мир&key=${GOOGLE_API_KEY}&maxResults=20&langRestrict=ru`),
        ]).then(([data1]) => {
            setRecommendationsData(data1.items)
        }).catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        console.log(mainBookData)
    }, [mainBookData]);

    return (
        <div>
            <Header/>
            <main className="main">
                <MyCarousel items={mainBookData} title={""} size={2}/>
                <div className="mb"></div>
                <MyCarousel items={recommendationsData} title={"Рекомендации для вас"} size={1}/>
                <div className="mb"></div>
                <MyCarousel items={recommendationsData} title={"Новое на сайте"} size={1}/>
                <div className="mb"></div>
                <MyCarousel items={recommendationsData} title={"Топ 10 книг за все время"} size={1}/>
                <div className="mb"></div>
                <MyCarousel items={recommendationsData} title={"Лучшее за месяц"} size={1}/>
            </main>
        </div>
    );
};

export default observer(MainPage);