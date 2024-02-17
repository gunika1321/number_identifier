const router = require('express').Router();
const middleware = require('./middleware');
const apihandler = require('./apihandler');

router.post('/signUp', middleware.signUp, apihandler.signUp);
router.post('/signIn', middleware.signIn, apihandler.signIn);
router.post('/markSpam', middleware.markSpam, apihandler.markSpam);
router.post('/search', middleware.search, apihandler.search);
module.exports = router;