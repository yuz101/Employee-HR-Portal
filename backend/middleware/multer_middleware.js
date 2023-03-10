const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const employeeId = '123';
        const destinationFolder = path.join(__dirname, '..', 'temp', employeeId);
        fs.mkdir(destinationFolder, { recursive: true }, (err) => {
            if (err) {
                console.error(err);
                throw err;
            }
            else {
                cb(null, destinationFolder);
            }
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || /^image\/(jpg|jpeg|png|gif|bmp|svg\+xml)$/.test(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type'), false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

const saveUploadedFile = (req, res, next) => {
    upload.single('document')(req, res, (err) => {
        if (err) {
            console.error('Error when processing file in request:', err);
            return res.status(400).json({ error: 'Error when processing uploaded file.' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file attached to request.' });
        }
        next();
    });
}

module.exports = saveUploadedFile;