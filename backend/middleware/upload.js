const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname) 
        cb(null, Date.now() + ext)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})

module.exports = upload