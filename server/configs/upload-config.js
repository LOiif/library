const multer = require('multer');
const path = require('path');

// Настройка хранения файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public'));
    },
    filename: (req, file, cb) => {
        let fileName = req.body.fileName ? req.body.fileName : file.originalname;
        cb(null, fileName + path.extname(file.originalname));
    }
});

// Проверка типа файла
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Ошибка: Неправильный тип файла!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // Ограничение размера файла 10MB
    fileFilter: fileFilter
});

module.exports = upload;