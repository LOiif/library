import React, {useState} from 'react';
import styles from "./ModalUploadFile.module.scss";
import {Triangle} from "react-loader-spinner";
import FileService from "../../services/FileService";
import {ReactComponent as CrossIcon} from "../../images/cross.svg";
import {observer} from "mobx-react-lite";
import {store} from "../../index";
import {SERVER_URL} from "../../http";
import BookService from "../../services/BookService";
import DocumentService from "../../services/DocumentService";
import {log} from "util";

const ModalUploadFile = ({showModal, closeModal, updateUploads}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [selectedBookImageFile, setSelectedBookImageFile] = useState(null);
    const [selectedDocImageFile, setSelectedDocImageFile] = useState(null);
    const [selectedDocPdfFile, setSelectedDocPdfFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [bookImgFileError, setBookImgFileError] = useState('');
    const [docImgFileError, setDocImgFileError] = useState('');
    const [docPdfFileError, setDocPdfFileError] = useState('');
    const [showBlock, setShowBlock] = useState('book')
    const [bookDescriptionValue, setBookDescriptionValue] = useState('')
    const [bookTitleValue, setBookTitleValue] = useState('')
    const [bookISBNValue, setBookISBNValue] = useState('')
    const [bookAuthorsValue, setBookAuthorsValue] = useState('')
    const [bookLinkValue, setBookLinkValue] = useState('')
    const [documentTitleValue, setDocumentTitleValue] = useState('')
    const [documentDescriptionValue, setDocumentDescriptionValue] = useState('')


    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const allowedPDFTypes = ['application/pdf'];
    const uploadBookHandler = async () => {

        if (!selectedBookImageFile) {
            setUploadStatus('Пожалуйста, выберите файл для загрузки.');
            return;
        }
        if (!bookTitleValue || !bookDescriptionValue || !bookAuthorsValue || !bookISBNValue) {
            return;
        }

        const formData = new FormData();

        const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        formData.append('fileName', uniqueFileName);
        formData.append('file', selectedBookImageFile);
        const filePath = `${SERVER_URL}/static/${uniqueFileName}.${selectedBookImageFile.name.split('.').pop()}`;
        console.log(filePath)

        const bookData = {
            id: uniqueFileName,
            volumeInfo: {
                title: bookTitleValue,
                previewLink: bookLinkValue,
                description: bookDescriptionValue,
                authors: bookAuthorsValue.split(',').map((el) => el.trim()),
                imageLinks: {
                    smallThumbnail: filePath
                }
            },
            uploadUserId: store.getUser().id
        }

        try {
            const response = await FileService.uploadFile(formData).then(() => {
                store.addBook(bookData)
                    .then(() => updateUploads())
            })

            setUploadStatus('Файл успешно загружен.');
        } catch (error) {
            setUploadStatus('Ошибка при загрузке файла.');
        }
    }

    const uploadDocumentHandler = async () => {

        if (!selectedDocPdfFile || !selectedDocImageFile || !documentDescriptionValue || !documentTitleValue) {
            setUploadStatus('Пожалуйста, выберите файл для загрузки и заполните поля');
            return;
        }

        const imgFormData = new FormData();
        const pdfFormData = new FormData();

        const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        imgFormData.append('fileName', uniqueFileName);
        imgFormData.append('file', selectedDocImageFile);

        pdfFormData.append('fileName', uniqueFileName);
        pdfFormData.append('file', selectedDocPdfFile);

        const imgFilePath = `${SERVER_URL}/static/${uniqueFileName}.${selectedDocImageFile.name.split('.').pop()}`;
        const pdfFilePath = `${SERVER_URL}/static/${uniqueFileName}.${selectedDocPdfFile.name.split('.').pop()}`;

        const docData = {
            id: uniqueFileName,
            title: documentTitleValue,
            description: documentDescriptionValue,
            img: imgFilePath,
            pdf: uniqueFileName,
            uploadUserId: store.getUser().id
        }

        try {
            const response = await FileService.uploadFile(imgFormData)
                .then(() => FileService.uploadFile(pdfFormData))
                .then(() => DocumentService.addDocument(docData))
                .then(() => DocumentService.getAllDocuments())
                .then((res) => console.log(res))

            setUploadStatus('Файл успешно загружен.');
        } catch (error) {
            setUploadStatus('Ошибка при загрузке файла.');
        }
    }
    const bookImageChangeHandler = (event) => {
        const file = event.target.files[0];
        setUploadStatus('')

        if (file) {
            if (!allowedImageTypes.includes(file.type)) {
                setBookImgFileError('Неверный тип файла. Пожалуйста, выберите изображение (jpeg, jpg, png)');
                setSelectedBookImageFile(null);
            } else {
                setBookImgFileError('');
                setSelectedBookImageFile(file);
                console.log()
            }
        }
    };

    const docImageFileHandler = (event) => {
        const file = event.target.files[0];
        setUploadStatus('')

        if (file) {
            if (!allowedImageTypes.includes(file.type)) {
                setDocImgFileError('Неверный тип файла. Пожалуйста, выберите изображение (jpeg, jpg, png)');
                setSelectedDocImageFile(null);
            } else {
                setDocImgFileError('');
                setSelectedDocImageFile(file);
                console.log()
            }
        }
    };
    const docPdfFileHandler = (event) => {
        const file = event.target.files[0];
        setUploadStatus('')
        if (file) {
            if (!allowedPDFTypes.includes(file.type)) {
                setDocPdfFileError('Неверный тип файла. Пожалуйста, выберите pdf файл');
                setSelectedDocPdfFile(null);
            } else {
                setDocPdfFileError('');
                setSelectedDocPdfFile(file);
                console.log()
            }
        }
    };
    const changeBlock = (e) => {
        setShowBlock(e.target.getAttribute("data-block"))
    }

    return (
        showModal
            ? <div className={styles.container}>
                <div className={styles.content}>
                    <button className={styles.close} onClick={(e) => closeModal()}>
                        <i><CrossIcon></CrossIcon></i>
                        Закрыть
                    </button>
                    <h2 className={styles.title}>Загрузка своего произведения</h2>
                    {
                        store.getUser().isActivated
                            ? <div className={styles.blocksChangersContainer}>
                                <div data-block={"book"} onClick={changeBlock}
                                     className={showBlock === "book" ? styles.blockChanger + " " + styles.blockChangerActive : styles.blockChanger}>Книга
                                </div>
                                <div data-block={"doc"} onClick={changeBlock}
                                     className={showBlock === "doc" ? styles.blockChanger + " " + styles.blockChangerActive : styles.blockChanger}>Документация
                                </div>
                            </div>
                            : <></>

                    }
                    <div className={styles.blockContent}>
                        {

                            showBlock === "book"
                                ?
                                <div>
                                    <div className={styles.item}>
                                        <p>Загрузите обложку для книги</p>
                                        <label className={styles.customFileInput}>
                                            <input type="file" className={styles.fileInput} onChange={bookImageChangeHandler}/>
                                            Выберите файл
                                        </label>
                                        {bookImgFileError && <p className={styles.error}>{bookImgFileError}</p>}
                                    </div>

                                    <div className={styles.item}>
                                        <p>Название для книги</p>
                                        <input value={bookTitleValue} onChange={(e) => setBookTitleValue(e.target.value)}
                                               className={styles.titleInput} type="text" placeholder={"Название книги..."}/>
                                    </div>

                                    <div className={styles.item}>
                                        <p>Авторы</p>
                                        <input value={bookAuthorsValue}
                                               onChange={(e) => setBookAuthorsValue(e.target.value)}
                                               className={styles.titleInput} type="text"
                                               placeholder={"Авторы через запятую..."}/>
                                    </div>

                                    <div className={styles.item}>
                                        <p>Код ISBN</p>
                                        <input value={bookISBNValue} onChange={(e) => setBookISBNValue(e.target.value)}
                                               className={styles.titleInput} type="text" placeholder={"ISBN..."}/>
                                    </div>

                                    <div className={styles.item}>
                                        <p>Описание</p>
                                        <textarea
                                            placeholder={"Описание..."}
                                            value={bookDescriptionValue}
                                            className={styles.descriptionArea}
                                            onChange={(e) => setBookDescriptionValue(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.item}>
                                        <p>Ссылка на произведение</p>
                                        <input value={bookLinkValue} onChange={(e) => setBookLinkValue(e.target.value)}
                                               className={styles.titleInput} type="text" placeholder={"Ссылка..."}/>
                                    </div>


                                    <button className={styles.uploadButton} onClick={uploadBookHandler}>Загрузить книгу
                                    </button>

                                    {uploadStatus && <p>{uploadStatus}</p>}
                                </div>
                                :
                                <div>
                                    <div className={styles.item}>
                                        <p>Загрузите картинку станка</p>
                                        <label className={styles.customFileInput}>
                                            <input type="file" className={styles.fileInput} onChange={docImageFileHandler}/>
                                            Выберите файл
                                        </label>
                                        {docImgFileError && <p className={styles.error}>{docImgFileError}</p>}
                                    </div>

                                    <div className={styles.item}>
                                        <p>Загрузите pdf файл тех. документации</p>
                                        <label className={styles.customFileInput}>
                                            <input type="file" className={styles.fileInput} onChange={docPdfFileHandler}/>
                                            Выберите файл
                                        </label>
                                        {docPdfFileError && <p className={styles.error}>{docPdfFileError}</p>}
                                    </div>

                                    <div className={styles.item}>
                                        <p>Название станка</p>
                                        <input value={documentTitleValue} onChange={(e) => setDocumentTitleValue(e.target.value)}
                                               className={styles.titleInput} type="text" placeholder={"Название станка..."}/>
                                    </div>

                                    <div className={styles.item}>
                                        <p>Описание</p>
                                        <textarea
                                            placeholder={"Описание..."}
                                            value={documentDescriptionValue}
                                            className={styles.descriptionArea}
                                            onChange={(e) => setDocumentDescriptionValue(e.target.value)}
                                        />
                                    </div>

                                    <button className={styles.uploadButton} onClick={uploadDocumentHandler}>
                                        Загрузить документ
                                    </button>

                                    {uploadStatus && <p>{uploadStatus}</p>}
                                </div>
                        }
                    </div>
                </div>
            </div>
            : <></>

    );
};

export default observer(ModalUploadFile);