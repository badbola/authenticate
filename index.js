//express server
const express = require('express');
const cookieParser = require('cookie-parser');
//port of localhost on which web app will run
const port = 8000;
//assingning all the libraries of express to a const app
const app = express();
//implementing db in the index
const db = require('./config/mongoose');
//crete express session
const session = require('express-session');
//passport for authentication
const passport = require('passport');
//using local strategy
const passportLocal = require('./config/passport-local-strategy');
//using google api for login signup
const paspportGoogle = require('./config/passport-google-oauth2-strategy');
//store session in database
const MongoStore = require('connect-mongo')(session);
//for flash message
const flash = require('connect-flash');
const customMware = require('./config/middleware');



app.use(express.urlencoded());
app.use(cookieParser());
// implementing express layouts
const expressLayouts = require('express-ejs-layouts');
// using express layouts
app.use(expressLayouts);
//for seperate js and css for every page
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);

//setting up view engine
app.set('view engine', 'ejs');
//assingning folder of ejs files to views
app.set('views', 'views');
//mongostore is used too use session cookie
app.use(session({
    name: 'Authenticator',
    secret: 'hashBrown',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }        
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setFlash);

// for implementing css and js files to web app
app.use(express.static('assets'));
//using paspport to give access
app.use(passport.setAuthenticatedUser);
//use express router
app.use('/',require('./routes/index'));


//listing the port and check whether running or not
app.listen(port,function(err){
    if(err){
        console.log('Initial Error', err);
        return;
    }
    console.log('Server is running up on ',port);
})