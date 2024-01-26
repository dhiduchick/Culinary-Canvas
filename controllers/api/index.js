const router = require('express').Router();
const postRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');

router.use('/posts', postRoutes);

router.use('/users', userRoutes);

module.exports = router;

