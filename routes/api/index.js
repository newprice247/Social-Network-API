const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/thoughts', postRoutes);

module.exports = router;