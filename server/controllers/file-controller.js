const fileService = require('../services/file-service');
const path = require('path');
const BASE_DIR = path.resolve(__dirname, '..');
class FileController {
    async downloadFile(req, res, next) {
        try {
            const filename = req.params.filename;
            console.log(filename)
            const filePath = path.join(BASE_DIR, "public", "technical_documentation", filename);
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
}

module.exports = new FileController();