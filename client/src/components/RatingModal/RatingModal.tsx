import React, {useState} from 'react';
import styles from "./RatingModal.module.scss";
import {ReactComponent as CrossIcon} from "../../images/cross.svg";
import {ReactComponent as StarSvg} from "../../images/star.svg";
import {observer} from "mobx-react-lite";
import BookService from "../../services/BookService";

const RatingModal = ({showModal, closeModal, bookId, userId, updateRating}) => {
    const [activeItem, setActiveItem] = useState(0)
    const containerClickHandler = (e) => {
        if (e.target.className === styles.container) {
            closeModal()
        }
    }
    const itemClickHandler = (e) => {
        setActiveItem(parseInt(e.target.closest(`.${styles.ratingItem}`).textContent))
    }

    const ratingClickHandler = (e) => {
        if (activeItem > 0 && activeItem <= 5) {
            console.log(userId, bookId, activeItem)
        }
        BookService.ratingBook(userId, bookId, activeItem).finally(() => {
            closeModal()
            updateRating()
        })
    }
    return (
        showModal
            ? <div className={styles.container} onClick={containerClickHandler}>
                <div className={styles.content}>
                    <button className={styles.close} onClick={(e) => closeModal()}>
                        <i><CrossIcon></CrossIcon></i>
                        Закрыть
                    </button>
                    <h2 className={styles.title}>Оцените произведение</h2>

                    <ul className={styles.ratingList}>
                        <li className={activeItem === 5 ? styles.ratingItem + ' ' + styles.ratingItemActive : styles.ratingItem}
                            onClick={itemClickHandler}
                        >
                            <p className={styles.rating}>{`5`}</p>
                            <StarSvg className={styles.ratingSvg} width={18} height={18}/> {` -  Отлично`}
                        </li>
                        <li className={activeItem === 4 ? styles.ratingItem + ' ' + styles.ratingItemActive : styles.ratingItem}
                            onClick={itemClickHandler}
                        >
                            <p className={styles.rating}>{`4`}</p>
                            <StarSvg className={styles.ratingSvg} width={18} height={18}/> {` -  Хорошо`}
                        </li>
                        <li className={activeItem === 3 ? styles.ratingItem + ' ' + styles.ratingItemActive : styles.ratingItem}
                            onClick={itemClickHandler}
                        >
                            <p className={styles.rating}>{`3`}</p>
                            <StarSvg className={styles.ratingSvg} width={18} height={18}/> {` -  Нормально`}
                        </li>
                        <li className={activeItem === 2 ? styles.ratingItem + ' ' + styles.ratingItemActive : styles.ratingItem}
                            onClick={itemClickHandler}
                        >
                            <p className={styles.rating}>{`2`}</p>
                            <StarSvg className={styles.ratingSvg} width={18} height={18}/> {` -  Не очень`}
                        </li>
                        <li className={activeItem === 1 ? styles.ratingItem + ' ' + styles.ratingItemActive : styles.ratingItem}
                            onClick={itemClickHandler}
                        >
                            <p className={styles.rating}>{`1`}</p>
                            <StarSvg className={styles.ratingSvg} width={18} height={18}/> {` -  Ужасно`}
                        </li>
                    </ul>

                    <button onClick={ratingClickHandler} className={styles.ratingButton}>Оценить</button>
                </div>
            </div>
            : <></>
    );
};

export default observer(RatingModal);