const passport = require('passport');

const bcrypt = require('bcrypt');
const saltRounds = 8;
const localStrategy = require('passport-local').Strategy;
const nodeMailer = require('../mailers/loginMailers');
const queue = require('../config/kue');
const loginEmailWorker = require('../workers/loginEmailWorker');
const User = require('../models/user');
//authinetication using passport
passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req,email,password,done){
        //find user and create identity
        
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            bcrypt.compare(password,user.password,function(err,isMatch){
                if(err){
                    console.log('Error in bcrypt',err);
                    return done(err);
                }
                if(!isMatch){
                    req.flash('error','Invalid Username or Password!');
                    return done(null,false);
                }
                else{
                    //console.log(user);
                    //nodeMailer.newLogin(user);
                    let job = queue.create('emails', user).save(function(err){
                        if(err){
                            console.log('Error in queue',err);
                        }
                        console.log(job.id);
                    })
                    return done(null,user);
                }
            });
            // if(!user || user.password != code){
            //     console.log('Invalid user or Password');
            //     return done(null,false);
            // }

        });
    }
));


//serializing user to keep key in cookies
passport.serializeUser(function(user,done){
    done(null, user.id);
});


//deserualize the user
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('cannot find user');
            return done(null,false);
        }
        return done(null,user);
    })
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
};

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;