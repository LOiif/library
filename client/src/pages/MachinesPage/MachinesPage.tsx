import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from "./MachinesPage.module.scss"
import {store} from "../../index";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import DocumentService from "../../services/DocumentService";

const MachinesPage = () => {

    const [documentations, setDocumentations] = useState([])

    useEffect(() => {
     DocumentService.getAllDocuments().then((res) => {
         setDocumentations(res.data)
     })
    }, [])

    return (
        <>
            <Header></Header>
            <main className={styles.main}>
                <div className={styles.container}>
                    <ul className={styles.machinesList}>
                        {
                            documentations.map((doc) =>
                                <li className={styles.machinesItem} key={doc.id}>
                                    <Link to={`/machines/${doc.id}`} state={{doc}} className={styles.link}>
                                        <img src={doc.img} alt={doc.title}/>
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