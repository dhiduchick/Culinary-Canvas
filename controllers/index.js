const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
//defining what routes to use for witch api route
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router; 