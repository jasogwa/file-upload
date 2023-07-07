import multer from 'multer';
import uniqid from 'uniqid';

const storage = multer.diskStorage({
    destination: function (req, files, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, files, cb) {
        cb(null, Date.now() + uniqid() + files.originalname);
    }
});

export const upload = multer({ storage: storage });
