import React from 'react';
import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.authorsContainer}>
                <h4 className={styles.authorsTitle}>Разработчики сайта:</h4>
                <div  className={styles.authors}>
                    <p className={styles.authorText}>Елиссев С. А</p>
                    <p className={styles.authorText}>Рытов Е. М</p>
                </div>
            </div>

            <div className={styles.githubContainer}>
                <h4 className={styles.githubTitle}>Ссылка на GitHub</h4>
                <a className={styles.githubText} href={'https://github.com/LOiif/library'} target={'_blank'}>https://github.com/LOiif/library</a>
            </div>

            <div className={styles.contactContainer}>
                <h4 className={styles.contactTitle}>Почта для связи: </h4>
                <p className={styles.contactText}>easylib.auth@gmail.com</p>
            </div>
        </div>
    );
};

export default Footer;