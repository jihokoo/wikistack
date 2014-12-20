/**
 * Module dependencies.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var express = require('express');
var swig = require('swig');
var filter = require('./filters')(swig);
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();
app.engine("html", swig.renderFile);
var MongoStore = require('connect-mongo')(express);



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
  secret: '1234567890QWERTY',
  store: new MongoStore({
    url: 'mongodb://localhost/wikistack'
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.






// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  swig.setDefaults({ cache: false });
}


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.post('/wiki/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/wiki/login_page'}))

// app.get('/wiki/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

function ensureAuthenticated(req, res, next) {
  debugger;
  if (req.isAuthenticated()) {
    console.log("ensured")
    return next(); }
  console.log("notensured")
  res.redirect('/wiki/login_page')
}


app.get('/', routes.index);
app.get('/wiki/new_user', user.new_user)
app.get('/wiki/login_page', user.login_page)
// app.get('/users', user.list);
app.get('/wiki/add', user.add);
app.post('/wiki/add_page', ensureAuthenticated, user.add_page);
app.post('/wiki/create', user.createUser)
app.get('/wiki/:url_name', user.show_content)
app.get('/wiki/:idnumber/edit', user.edit)
app.post('/wiki/:idnumber/edit_page', ensureAuthenticated, user.edit_page)
app.post("/wiki/:idnumber/delete", user.deleter)
app.get("/wiki/:idnumber/past_versions", user.past_versions)
app.get('/wiki/:url_name/:idnumber', user.shows)
app.get('/wiki/:url_name/:idnumber/pasty', user.pasty)

var models = require('./models')





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
