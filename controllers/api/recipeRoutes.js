const router = require("express").Router();
const { recipe} = require("../../models");
const withAuth = require('../../utils/auth');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require('dotenv').config();

// Cloudinary configuration
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

const parser = multer({ storage: storage2 });

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await recipe.findAll();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post('/', withAuth, parser.single('image'), async (req, res) => {
  try {
    const { title, author, ingredients, directions } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const recipeData = await Recipe.create({
      title,
      author,
      ingredients,
      directions,
      image_url: imageUrl,
    });

    res.status(201).json(recipeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a recipe with image
// router.post("/photo", withAuth, parser.single('image'), async (req, res) => {
//   try {
//     // Find the logged-in user based on the session ID
//     const newRecipe = await image.create({
//       media: req.file.path,
//       caption: req.body.caption,
//       user_id: req.session.user_id,
//     });
//     console.log(newRecipe);
//     res.status(200).json(newRecipe);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Create a recipe with text
// router.post("/text", withAuth, async (req, res) => {
//   try {
//     const newRecipe = await recipe.create({
//       caption: req.body.caption,
//       user_id: req.session.user_id,
//     });
//     console.log(newRecipe);
//     res.status(200).json(newRecipe);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Update the recipe based on the user id
router.put("/:id", withAuth, async (req, res) => {
  recipe.update(
    {
      caption: req.body.caption,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Delete the recipe based on the user id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedRecipe = await recipe.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedRecipe) {
      res.status(404).json({ message: "No recipe found with this id!" });
      return;
    }
    res.status(200).json(deletedRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;



// const router = require("express").Router();
// const { recipe,image } = require("../../models");
// const withAuth = require('../../utils/auth');

// // Get all posts and JOIN with cloudinary data
// router.get("/", async (req, res) => {
//   try {
//     const newRecipe = await recipe.findAll();

//     res.status(200).json(newRecipe);
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// });


// // Cloudinary functionality
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// require('dotenv').config()

// cloudinary.config({
// cloud_name: process.env.CLOUD_NAME,
// api_key: process.env.API_KEY,
// api_secret: process.env.API_SECRET
// });

// const storage2 = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//     folder: "posts",
//     format: 'png',
//     allowedFormats: ["jpg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }]
//     },
// });

// const parser = multer({storage: storage2});

// // Post route allows to create a post with image
// router.post("/photo", withAuth, parser.single('image'), async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const newRecipe = await image.create({
//       media: req.file.path,
//       caption: req.body.caption,
//       user_id: req.session.user_id,
//     });
//     console.log(newRecipe)
//     res.status(200).json(newRecipe);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Post route allows to create a post with text
// router.post("/text",withAuth, async (req, res) => {
//   try {
//     const newRecipe = await recipe.create({
//       caption: req.body.caption,
//       user_id: req.session.user_id,
//     });
//     console.log(newRecipe)
//     res.status(200).json(newRecipe);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// // Put route allows to update the post based on the user id
// router.put("/:id", withAuth, async (req, res) => {
//   recipe.update(
//     {
//       caption: req.body.caption,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((updatedPost) => {
//       res.status(200).json(updatedPost);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// // Delete route allows to delete the post based on the user id
// router.delete("/:id",withAuth, async (req, res) => {
//   try {
//     const newRecipe = await recipe.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!newRecipe) {
//       res.status(404).json({ message: "No post found with this id!" });
//       return;
//     }
//     res.status(200).json(newRecipe);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;