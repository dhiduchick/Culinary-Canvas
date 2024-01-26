const router = require('express').Router();
const postRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');

router.use('/recipes', recipeRoutes);

router.use('/users', userRoutes);

module.exports = router;

