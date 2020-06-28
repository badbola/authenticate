const express = require('express');
const passport = require('passport');

const router = express.Router();


const userController = require('../controller/user_controller');

router.get('/signin', userController.signIn);
router.get('/signup', userController.signUp);
router.get('/profile',passport.checkAuthentication, userController.profile);


router.post('/create', userController.create);
//use passport as middlware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
),userController.createSession);

module.exports = router;