import React, {FC} from 'react';
import "./Carousel.scss";
import {ReactComponent as LeftArrowIcon} from "../../images/arrow_left.svg";
import {ReactComponent as RightArrowIcon} from "../../images/arrow_right.svg";

const Carousel: FC<any> = ({items, title, size}) => {
    let itemClass = 'item';
    switch(size){
        case 1:
            itemClass += ' item--small'
            break;
        case 2:
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
                <button className="button prev-button">
                    <LeftArrowIcon/>
                    Назад
                </button>
                <ul className="items-list">
                    {
                        items.map(() => <li className={itemClass}>
                            <a className="item-link" href=""></a>
                        </li>)
                    }
                </ul>
                <button className="button next-button">
                    <RightArrowIcon/>
                    Вперед
                </button>
            </div>
        </>
    )

};

export default Carousel;