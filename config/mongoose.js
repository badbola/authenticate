//library requirement
const mongoose  = require('mongoose');

//connect to db
mongoose.connect('mongodb://localhost/authentication_db');
//aquire to connect
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in db connection'));
db.once('open',function(){
    console.log('Connected to db successfully');
});

module.exports = db;