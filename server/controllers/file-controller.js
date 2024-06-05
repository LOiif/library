const fileService = require('../services/file-service');
const path = require('path');
const BASE_DIR = path.resolve(__dirname, '..');

class FileController {
    async downloadFile(req, res, next) {
        try {
            const filename = req.params.filename;
            console.log(filename)
            const filePath = path.join(BASE_DIR, "public", filename);
            console.log(filePath)

            res.download(filePath, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Ошибка при скачивании файла.');
                }
            });
        } catch (e) {
            next(e)
        }
    }

    async uploadFile(req, res, next) {

        console.log(req.body)
        try {
            if (!req.file) {
                return res.status(400).send('Ошибка: файл не загружен.');
            }

            const filePath = req.file.path;

            return res.status(200).json({message: 'Файл успешно загружен.', filePath: filePath});
        } catch (e) {
            next(e);
        }
    }

    async getFile(req, res, next) {
        try {
            console.log(req.params)
            const {fileName} = req.params;
            const imagePath = path.join(BASE_DIR, "public", fileName);
            res.sendFile(imagePath);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new FileController();