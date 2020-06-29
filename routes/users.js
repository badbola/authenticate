const express = require('express');
const passport = require('passport');

const router = express.Router();


const userController = require('../controller/user_controller');

router.get('/signin', userController.signIn);
router.get('/signup', userController.signUp);
router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.get('/signout', userController.destroySession);
router.post('/update/:id',passport.checkAuthentication, userController.reset);
router.post('/create', userController.create);
//use passport as middlware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
),userController.createSession);

router.get('/auth/google',passport.authenticate('google', {scope: ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect: 'users/signin'}), userController.createSession);

module.exports = router;