const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User= require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 8;

//use new strategy for google login

passport.use(new googleStrategy({
    clientID: "879224690863-8u0ddgp5q2e649819ejfo0vdrtmlj8j0.apps.googleusercontent.com",
    clientSecret: "VhlJQ3jpTRS5_ekEMEVTyHLm",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function (accessToken, profileToken, profile, done) {
        User.findOne({email: profile.emails[0].value}).exec(function (err,user) {
            if(err){
                console.log('Error in google but not in my code damn!!!!',err);
                return;
            }
            console.log(profile);
            if(user){
                //set as req.user
                return done(null,user);
            }
            else{
                //create and set req.user
                var pass = crypto.randomBytes(20).toString('hex');
                bcrypt.hash(pass, saltRounds, function(err, hash) {
                    // Store hash in your password DB.
                    User.create({email:profile.emails[0].value,password:hash, name:profile.displayName}, function(err,user){
                        if(err){
                            console.log('error in creating user',err);
                            return;
                        }
                        return done(null,user) 
                    })
                });
            }
        })
    }
));

module.exports = passport;