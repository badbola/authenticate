const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const User = require('../models/users');
//authinetication using passport
passport.use(new localStrategy({
    usernameField: 'email',
    },
    function(email,password,done){
        //find user and create identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Cannot find User');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid user or Password');
                return done(null,false);
            }

            return done(null,user);
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
})

module.exports = passport;