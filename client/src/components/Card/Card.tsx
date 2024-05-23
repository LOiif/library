import React, {FC, useEffect, useState} from 'react';
import './Card.scss';
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

const Card: FC<any> = ({bookInfo}) => {
    const [thumbnail, setThumbnail] = useState('')
    useEffect(() => {
        let img = bookInfo.volumeInfo?.imageLinks?.extraLarge
            || bookInfo.volumeInfo?.imageLinks?.large
            || bookInfo.volumeInfo?.imageLinks?.medium
            || bookInfo.volumeInfo?.imageLinks?.small
            || bookInfo.volumeInfo?.imageLinks?.thumbnail
            || bookInfo.volumeInfo?.imageLinks?.smallThumbnail

        setThumbnail(img)
    }, [bookInfo]);

    return (
        <>
            <Link to={`/book/${bookInfo.id}`} state={{bookInfo}} className={'card'}>
                <img className={"img"} src={thumbnail != undefined ? thumbnail : ''}/>
                <div className={"info"}>
                    {
                        bookInfo.volumeInfo.title ?
                            <p className="book_title">{bookInfo.volumeInfo.title}</p>
                            : <></>
                    }
                </div>
            </Link>
        </>
    )
};

export default observer(Card);