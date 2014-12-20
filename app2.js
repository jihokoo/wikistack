

/**
 * Module dependencies.
 */

var express = require('express');
var swig = require('swig');
var filter = require('./filters')(swig);
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');


var app = express();
app.engine("html", swig.renderFile);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/users', user.list);
app.get('/add', user.add);
app.post('/add_page', user.add_page);
app.get('/wiki/:url_name', user.show_content)
app.get('/wiki/:idnumber/edit', user.edit)
app.post('/wiki/:idnumber/edit_page', user.edit_page)
app.post("/wiki/:idnumber/delete", user.deleter)
app.get("/wiki/:idnumber/past_versions", user.past_versions)
app.get('/wiki/:url_name/:idnumber', user.shows)
app.get('/wiki/:url_name/:idnumber/pasty', user.pasty)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
