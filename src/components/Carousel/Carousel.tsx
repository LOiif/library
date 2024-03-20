import React, {FC} from 'react';
import "./Carousel.scss";
import {ReactComponent as LeftArrowIcon} from "../../images/arrow_left.svg";
import {ReactComponent as RightArrowIcon} from "../../images/arrow_right.svg";
import Card from "../Card/Card";

const Carousel: FC<any> = ({items, title, size}) => {
    let itemClass = 'item';
    let buttonClass = 'button'
    switch(size){
        case 1:
            buttonClass += ' button--small'
            itemClass += ' item--small'
            break;
        case 2:
            buttonClass += ' button--big'
            itemClass += ' item--big'
            break;
    }
    return (
        <>
            {
                (title) ? <h2 className="title">{title}</h2>
                    : <></>
            }
            <div className="carousel-container">
                <button className={buttonClass + " prev-button"}>
                    <LeftArrowIcon/>
                    Назад
                </button>
                <ul className="items-list">
                    {
                        size == 1
                            ? items.slice(0, 7).map((item) => <li className={itemClass}>
                            <Card bookInfo={item}/>
                        </li>)
                            : items.slice(0, 5).map((item) => <li className={itemClass}>
                                <Card bookInfo={item}/>
                            </li>)
                    }
                </ul>
                <button className={buttonClass + " next-button"}>
                    <RightArrowIcon/>
                    Вперед
                </button>
            </div>
        </>
    );
};

export default Carousel;