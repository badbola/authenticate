const express = require('express');
const { urlencoded } = require('express');
const port = 8000;

const db = require('./config/mongoose');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded());
app.use(express.static('assets'));
// function requestHandler(req,res){
//     console.log(req.url);
//     res.writeHead(200,{'content-type': 'text/html'});
//     res.end("<h1>And we start</h1>");
// }
app.get('/',function(req,res){
    return res.render('home',{
        title: 'Home is here'
    });
})

app.listen(port,function(err){
    if(err){
        console.log('Initial Error', err);
        return;
    }
    console.log('Server is running up on ',port);
})