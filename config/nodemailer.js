// using nodemailer
const nodemailer = require('nodemailer');
//for the template
const ejs = require('ejs');
const path = require('path');
// transpoerted which carry credentials
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smpt.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'enter your id',
        pass: 'your pass'
    }
});
// template credentials
let renderTemplate = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer', relativePath),
        data,
        function (err,template) {
            if(err){console.log('error in rendering template'); return;}
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}