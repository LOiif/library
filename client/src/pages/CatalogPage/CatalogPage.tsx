import React, {FC} from 'react';
import Header from "../../components/Header/Header";
import styles from "./CatalogPage.module.scss"

const CatalogPage: FC<any> = ({searchQuery}) => {
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <input type="text" />
            </main>
        </>
    );
};

export default CatalogPage;