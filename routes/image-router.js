const router = require('express').Router();
const Images = require('../helpers/image-model');
const Users = require('../helpers/user-model');
const authenticate = require('../auth/authenticate-middleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb (null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb (null, new Date().toISOString() + file.originalname)
    }
})
const upload = multer({dest: 'uploads/'})

module.exports = router;
