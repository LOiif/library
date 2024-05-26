import React from 'react';
import Header from "../../components/Header/Header";
import styles from "./MachinesPage.module.scss"
import {store} from "../../index";
import {documentationFilenames} from "../../http/documentation-filenames";

const MachinesPage = () => {
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
                <div className={styles.container}>

                    {
                        documentationFilenames.map((filename) =>
                            <button onClick={downloadPDF} id={filename} key={filename} className={styles.download}>{`Скачать техническую документацию для ${filename}`}</button>
                        )
                    }

                </div>
            </main>
        </>
    );
};

export default MachinesPage;