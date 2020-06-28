const User = require('../models/user');

module.exports.signIn = function(req,res){
    return res.render('signIn', {title: 'Sign In'});
}
module.exports.signUp = function(req,res){
    return res.render('signUp',{title:'Sign Up'});
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        alert("Password and confirm password did not match");
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user' ,err);
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('error in creating user');
                    return;
                }
                return res.redirect('/users/signin'); 
            })
        }
        else{
            return res.redirect('/users/signup'); 
        }
    })
}
module.exports.createSession = function(req,res){
    //TODO
}