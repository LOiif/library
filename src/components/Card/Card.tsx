import React, {FC, useEffect, useState} from 'react';
import './Card.scss';
import axios from "axios";
const Card: FC<any> = ({bookInfo}) => {
    const [thumbnail, setThumbnail] = useState('')
    useEffect(() => {
        console.log('item: ')
        console.log(bookInfo)
        setThumbnail(bookInfo.volumeInfo.imageLinks && bookInfo.volumeInfo.imageLinks.smallThumbnail)
    }, [bookInfo]);


    return thumbnail != undefined ?
         (
            <>
                <div className={'card'}>
                    <img className={"img"} src={thumbnail}/>
                    <div className={"info"}>
                        {
                            bookInfo.volumeInfo.title ?
                                <p className="book_title">{bookInfo.volumeInfo.title}</p>
                                : <></>
                        }
                    </div>
                </div>
            </>
        )
        : <></>

};

export default Card;