const multer = require('multer');
const path = require('path');

// Storage strategy
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, path.join(__dirname, '../../../uploads/images'));
        } else if (file.mimetype.startsWith('video/')) {
            cb(null, path.join(__dirname, '../../../uploads/videos'));
        } else if (file.mimetype === 'application/pdf' || file.mimetype.includes('document')) {
            cb(null, path.join(__dirname, '../../../uploads/documents'));
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
        'video/mp4', 'video/mkv', 'video/webm',
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    },
    fileFilter
});

module.exports = upload;
