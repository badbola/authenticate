const queue = require('../config/kue');

const loginMailer = require('../mailers/loginMailers');

queue.process('emails', function(job,done){
    console.log('Emails worker up buddy',job.data);
    loginMailer.newLogin(job.data);
    done();

});