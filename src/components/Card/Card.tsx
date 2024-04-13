import React, {FC, useEffect, useState} from 'react';
import './Card.scss';
import {Link} from "react-router-dom";

const Card: FC<any> = ({bookInfo}) => {
    const [thumbnail, setThumbnail] = useState('')
    useEffect(() => {
        setThumbnail(bookInfo.volumeInfo.imageLinks && bookInfo.volumeInfo.imageLinks.smallThumbnail)
    }, [bookInfo]);

    return (
        <>
            <Link to={`book/${bookInfo.id}`} state={{bookInfo}} className={'card'}>
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

export default Card;