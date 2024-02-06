const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const oauthRoutes = require('./oauthRoutes');

//defining what routes to use for witch api route
router.use('/', homeRoutes);
router.use('/', oauthRoutes);
router.use('/api', apiRoutes);

module.exports = router; 