//this reuires each api route and designates the URL route below
const router = require('express').Router();
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');
const authRoute = require('./auth');



router.use('/recipes', recipeRoutes);

router.use('/users', userRoutes);

// router.use('/auth', authRoute)

module.exports = router;

