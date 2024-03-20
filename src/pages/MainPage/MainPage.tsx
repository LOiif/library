import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import './MainPage.scss';
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";

const MainPage = () => {

    const [bookData, setData]= useState([]);
    const API_KEY = 'AIzaSyAoXUwvsCrGZhf31no8STdw9V5YDpwP0FE';

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=федор+достоевский:keyes&key=${API_KEY}&maxResults=8`)
            .then(res => setData(res.data.items))
            .catch(err => console.log(err));
        console.log(bookData)
    }, []);
    useEffect(() => {
        console.log(bookData)
    }, [bookData]);

    return (
        <div>
            <Header/>
            <main className="main">
                <Carousel items={bookData} title={""} size={2}/>
                <div className="mb"></div>
                <Carousel items={bookData} title={"Рекомендации для вас"} size={1}/>
                <div className="mb"></div>
                <Carousel items={bookData} title={"Новое на сайте"} size={1}/>
                <div className="mb"></div>
                <Carousel items={bookData} title={"Топ 10 книг за все время"} size={1}/>
                <div className="mb"></div>
                <Carousel items={bookData} title={"Лучшее за месяц"} size={1}/>
            </main>
        </div>
    );
};

export default MainPage;