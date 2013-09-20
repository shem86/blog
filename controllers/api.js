/* The API controller
 Exports 3 methods:
 * post - Creates a new post
 * postComment - Creates a new comment in post
 * getAll - Get All posts
 * list - Returns a list of threads
 * show - Displays a thread and its posts - deprecated
 * articleById - Get a post by id (not RESTful)
 * showAll - Show all posts (not RESTful)
 */

var Articles = require('../models/articles.js');
var Comments = require('../models/comments.js');

exports.post = function(req, res) {
    new Articles({
        title: req.body.title,
        author: req.body.author,
        body:   req.body.body,
        hidden: req.body.hidden
    }).save(function (err, article) {
        if (err) {
            console.log(err);
        }
        res.send(article);
    });
}

exports.postComment = function(req, res) {
    Articles.findOne({_id: req.params.id }, function (err, article) {
        article.comments.push({
            'person': req.body.person,
            'comment': req.body.comment
        });
        article.save(function (err, article) {
            if (err) {
                console.log(err);
            }
            res.send(article);
        });
    });
}

exports.getAll = function(req, res) {
    Articles.find(function(err, articles) {
        res.send(articles);
    });
}

// first locates a thread by title, then locates the replies by thread ID.
exports.show = (function(req, res) {
    Articles.findOne({title: req.params.title}, function(error, article) {
        var comments = Comments.find({article: article._id}, function(error, comments) {
            res.send([{article: article, comments: comments}]);
        });
    })
});

//no REST here

exports.articleById = function(req, res) {
    Articles.findOne({_id: req.params.id}, function (err, article) {
        res.render('blog_show.jade', {
            article: article
        });
    });
}

exports.showAll = function(req, res, callback) {
    Articles.find(function(err, articles) {
        res.render('all.jade', {
            title: 'All Articles Bootstrapped',
            articles: articles
        });
    });
}