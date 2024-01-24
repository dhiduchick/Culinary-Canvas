const router = require("express").Router();

const { recipe, post, users, image } = require("../../models");

// Get all posts and JOIN with cloudinary data
router.get("/", async (req, res) => {
  try {
    const postData = await post.findAll();

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});


// Cloudinary functionality
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require('dotenv').config()

cloudinary.config({
cloud_name: process.env.CLOUD_NAME,
api_key: process.env.API_KEY,
api_secret: process.env.API_SECRET
});

const storage2 = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: "posts",
    format: 'png',
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
    },
});

const parser = multer({storage: storage2});

// Post route allows to create a post with image
router.post("/photo", parser.single('image'), async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await post.create({
      media: req.file.path,
      caption: req.body.caption,
      user_id: req.session.user_id,
    });
    console.log(postData)
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post route allows to create a post with text
router.post("/text", async (req, res) => {
  try {
    const postData = await post.create({
      caption: req.body.caption,
      user_id: req.session.user_id,
    });
    console.log(postData)
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Put route allows to update the post based on the user id
router.put("/:id", async (req, res) => {
  Post.update(
    {
      caption: req.body.caption,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedPost) => {
      res.status(200).json(updatedPost);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Delete route allows to delete the post based on the user id
router.delete("/:id", async (req, res) => {
  try {
    const postData = await post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;