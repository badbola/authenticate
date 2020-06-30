const nodeMailer = require('../config/nodemailer');

// another way of exporting method
exports.newSignup = (signup)=>{
    console.log(signup);
    nodeMailer.transporter.sendMail({
        from: 'admin@authenticator.com',
        to: signup.email,
        subject: 'Welcome to the Authenticator',
        html: '<h1>We Welcome you to the Authenticator.</h1>'
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    })
}