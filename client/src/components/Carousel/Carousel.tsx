import React, {FC} from 'react';
import 'react-multi-carousel/lib/styles.css';
import "./Carousel.scss";
import {ReactComponent as LeftArrowIcon} from "../../images/arrow_left.svg";
import {ReactComponent as RightArrowIcon} from "../../images/arrow_right.svg";
import Card from "../Card/Card";
import Carousel from 'react-multi-carousel';

const MyCarousel: FC<any> = ({items, title, size}) => {
    let itemClass = 'item';
    let buttonClass = 'button'

    let deskItems = 7;
    let tabletItems = 5;
    let mobileItems = 3;

    switch (size) {
        case 1:
            buttonClass += ' button--small'
            itemClass += ' item--small'
            deskItems = 7;
            tabletItems = 4;
            mobileItems = 2;
            break;
        case 2:
            buttonClass += ' button--big'
            itemClass += ' item--big'
            deskItems = 5;
            tabletItems = 2;
            mobileItems = 1;
            break;
    }
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: deskItems
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: deskItems
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: tabletItems
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: mobileItems
        }
    };
    return (
        <>
            {
                (title) ? <h2 className="title">{title}</h2>
                    : <></>
            }
            <Carousel responsive={responsive}
                      itemClass={itemClass}
                      infinite={true}
                      containerClass={size === 2 ? "carousel-container--big" : "carousel-container--small"}
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                      partialVisible={false}
                      customLeftArrow={<button className={buttonClass + " prev-button"}>
                          <LeftArrowIcon/>
                          Назад
                      </button>}
                      customRightArrow={<button className={buttonClass + " next-button"}>
                          <RightArrowIcon/>
                          Вперед
                      </button>}
            >
                {
                    items.map((item) => <div key={item.id} className={itemClass}>
                        <Card bookInfo={item}/>
                    </div>)
                }
            </Carousel>
        </>
    );
};

export default MyCarousel;