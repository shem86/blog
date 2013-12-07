require('newrelic');
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');

var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/blogdb';

mongoose.connect(mongoUri, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + mongoUri);
    }
});

// all environments
app.set('port', process.env.PORT || 5000);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.set('views', __dirname + '/views');
app.engine('html', require('jade').__express);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler());

// set up the RESTful API, handler methods are defined in api.js
var api = require('./controllers/api.js');

//RESTful
app.post('/articles', api.post);

app.post('/articles/:id/postComment', api.postComment);

app.get('/articles', api.getAll);

//routes
app.get('/articles/:id', api.articleById);

app.get('/', api.showAll);

app.get('/testREST', function(req, res){
    res.render('index.jade');
});

app.get('/new', function(req, res) {
    res.render('blog_new.jade', {
        title: 'New Post'
    });
});

app.listen(process.env.PORT || 5000);
console.log(process.env.PORT || 5000);