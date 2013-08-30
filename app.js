
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var ArticleProvider = require('./article-provider-mongodb').ArticleProvider;

var app = express();


// all environments
app.configure('development', function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');

    app.set('view engine', 'jade');

    app.set('view options', {
        layout: false
    });
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

var articleProvider= new ArticleProvider('localhost', 27017);

//routes
app.get('/', function(req, res){
    articleProvider.findAll(function(error, docs){
        res.render('index', {
            title: 'Blog',
            articles:docs
        });
    });
});
app.get('/blog/new', function(req, res) {
    res.render('blog_new', {
        title: 'New Post'
    });
});

app.get('/blog/:id', function(req, res) {
    articleProvider.findById(req.param('id'), function(error, article){
        res.render('blog_show', {
                title: article.title,
                article:article
        });
    });
});

app.post('/blog/new', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body')
    }, function( error, docs) {
        res.redirect('/')
    });
});


app.post('/blog/addComment', function(req, res){
    articleProvider.saveComment(req.param('_id'),{
            'person': req.param('person'),
            'comment': req.param('comment')
    }, function( error, articleId) {
        res.redirect('/blog/' + articleId);
    });
});

app.listen(3000);