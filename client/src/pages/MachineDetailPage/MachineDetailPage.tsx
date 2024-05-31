import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from "./MachineDetailPage.module.scss"
import {useLocation} from 'react-router-dom'
import {store} from "../../index";
import {observer} from "mobx-react-lite";

const MachineDetailPage = () => {
    const location = useLocation()
    const [doc, setDoc] = useState(location.state.doc)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])
    const downloadPDF = (e) => {
        console.log('click')
        const fileName = e.target.id + '.pdf'
        store.downloadFile(fileName).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
    }

    return (
        <>
            <Header></Header>
            <main className={styles.main}>

                <h1 className={styles.title}>{doc.title}</h1>
                <div className={styles.imgContainer}>
                    <img src={`/images/machines/${doc.img}.jpg`} alt={doc.title}/>
                </div>
                <p className={styles.description}>{doc.description}</p>
                {
                    store.isAuth && store.getUser()?.isActivated
                        ? <button onClick={downloadPDF} id={doc.pdf}
                                 className={styles.download}>{`Скачать техническую документацию для ${doc.pdf}`}
                        </button>
                        : <></>
                }
            </main>
        </>
    );
};

export default observer(MachineDetailPage);