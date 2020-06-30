const nodeMailer = require('../config/nodemailer');

// another way of exporting method
exports.newLogin = (login)=>{
    let htmlString = nodeMailer.renderTemplate({login: login},'/login/newLogin.ejs');

    console.log(login);
    nodeMailer.transporter.sendMail({
        from: 'admin@authenticator.com',
        to: login.email,
        subject: 'New Login',
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    })
}