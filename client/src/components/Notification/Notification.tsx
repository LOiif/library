import React, {useState} from 'react';
import styles from './Notification.module.scss'

const Notification = ({message='Ошибка', show=false, closeNotification}) => {


    return show ? (
        <div className={styles.container}>
            <p className={styles.message}>{message}</p>
            <button className={styles.closeButton} onClick={closeNotification}>Закрыть</button>
        </div>
    ) : <></>
};

export default Notification;