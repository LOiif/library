import React from 'react';
import Header from "../../components/Header/Header";
import './MainPage.scss';
import Carousel from "../../components/Carousel/Carousel";

const MainPage = () => {
    const items1 = ['item1', 'item2', 'item3'];
    const items2 = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'];
    const items3 = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'];
    return (
        <div>
            <Header/>
            <main className="main">
                <Carousel items={items1} title={""} size={2}/>
                <div className="mb"></div>
                <Carousel items={items2} title={"Рекомендации для вас"} size={1}/>
                <div className="mb"></div>
                <Carousel items={items3} title={"Новое на сайте"} size={1}/>
                <div className="mb"></div>
                <Carousel items={items3} title={"Топ 10 книг за все время"} size={1}/>
                <div className="mb"></div>
                <Carousel items={items3} title={"Лучшее за месяц"} size={1}/>
            </main>
        </div>
    );
};

export default MainPage;