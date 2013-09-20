/**
 * Created with JetBrains WebStorm.
 * User: shem
 * Date: 8/27/13
 * Time: 9:47 PM
 * To change this template use File | Settings | File Templates.
 */
//var Db = require('mongodb').Db;
//var MongoClient = require('mongodb').MongoClient;
//var Connection = require('mongodb').Connection;
//var Server = require('mongodb').Server;
//var BSON = require('mongodb').BSON;
//var ObjectID = require('mongodb').ObjectID;
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _DATEFORMAT = "dddd, MMMM Do YYYY, h:mm:ss a";


var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/blogdb';


mongoose.connect('mongodb://localhost/blogdb');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    // yay!
});



ArticleProvider = function(host, port) {
    var self = this;
    var mongoClient = new MongoClient(new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
    mongoClient.connect(mongoUri ,function(err, db) {
        self.db = db;
    });

};


ArticleProvider.prototype.getCollection= function(callback) {
    this.db.collection('articles', function(error, article_collection) {
        if( error ) callback(error);
        else callback(null, article_collection);
    });
};

ArticleProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, article_collection) {
        if( error ) callback(error)
        else {
            article_collection.find().toArray(function(error, results) {
                if( error ) callback(error)
                else callback(null, results)
            });
        }
    });
};


ArticleProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, article_collection) {
        if( error ) callback(error)
        else {
            article_collection.findOne({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
                if( error ) callback(error)
                else callback(null, result)
            });
        }
    });
};

ArticleProvider.prototype.save = function(articles, callback) {
    this.getCollection(function(error, article_collection) {
        if( error ) callback(error)
        else {
            if( typeof(articles.length)=="undefined")
                articles = [articles];

            for( var i = 0, article;i< articles.length;i++ ) {
                article = articles[i];
                article.created_at = moment().format(_DATEFORMAT);
                if( article.comments === undefined ) article.comments = [];
                for(var j =0;j< article.comments.length; j++) {
                    article.comments[j].created_at = moment().format(_DATEFORMAT);
                }
            }

            article_collection.insert(articles, function() {
                callback(null, articles);
            });
        }
    });
};

ArticleProvider.prototype.saveComment = function(articleId, comment, callback) {
    this.getCollection(function(error, article_collection) {
        if( error ) callback(error)
        else {
            comment.created_at = moment().format(_DATEFORMAT);
            article_collection.update({
                _id: article_collection.db.bson_serializer.ObjectID.createFromHexString(articleId)}, {
                $push: { comments: comment }
            }, function(error, article){
                if( error ) callback(error);
                else callback(null, articleId)
            });
        }
    });
};

exports.ArticleProvider = ArticleProvider;