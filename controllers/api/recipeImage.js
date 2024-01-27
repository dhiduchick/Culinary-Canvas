const router = require('express').Router()
const { Image } = require('../../models');

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require('dotenv').config()

cloudinary.config({
cloud_name: process.env.CLOUD_NAME,
api_key: process.env.API_KEY,
api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: "recipe_images",
    format: 'png',
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 400, height: 400, crop: "limit" }]
    },
});

const parser = multer({ storage: storage });

router.post('/', parser.single('image'), async (req,res) => {
    
    try {
        const findImage = await Image.findOne({
            where: {user_id: req.session.user_id}
        })
        
        if(!findImage){
        const imageData = await Image.create({
            multimedia_url: req.file.path,
            user_id: req.session.user_id,
        })
        res.status(200).json(imageData)
        console.log(req.file)
    }
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router