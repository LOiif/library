import React from 'react';
import Header from "../../components/Header/Header";
import styles from "./MachinesPage.module.scss"
import {store} from "../../index";
import { documentations } from "../../http/documentations"
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";


const MachinesPage = () => {

    return (
        <>
            <Header></Header>
            <main className={styles.main}>
                <div className={styles.container}>
                    <ul className={styles.machinesList}>
                        {
                            documentations.map((doc) =>
                                <li className={styles.machinesItem} key={doc.title}>
                                    <Link to={`/machines/${doc.pdf}`} state={{doc}} className={styles.link}>
                                        <img src={`/images/machines/${doc.img}.jpg`} alt={doc.title}/>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </main>
        </>
    );
};

export default observer(MachinesPage);