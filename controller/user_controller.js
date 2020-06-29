const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 8;

module.exports.profile = function(req,res){
    //console.log(req.params.id);
    User.findById(req.params.id, function (err,user) {
        return res.render('profile',{
            title: 'Profile',
            profile_user: user
        } );
    })
   
}
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signIn', {title: 'Sign In'});
}
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signUp',{title:'Sign Up'});
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error','Password and confirm password are not same!');
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user' ,err);
            return;
        }
        if(!user){
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                User.create({email:req.body.email,password:hash, name:req.body.name}, function(err,user){
                    if(err){
                        console.log('error in creating user');
                        return;
                    }
                    return res.redirect('/users/signin'); 
                })
            });
            
        }
        else{
            return res.redirect('/users/signup'); 
        }
    })
}
module.exports.createSession = function(req,res){
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}
module.exports.reset = function (req,res) {
    if(req.user.id === req.params.id){
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            User.findByIdAndUpdate(req.params.id,{password: hash},function (err,user) {
                //console.log(hash);
                return res.redirect('back');
            }) 
        }); 
    }else{
        return res.status(401).send('Unauthorized');
    }
}