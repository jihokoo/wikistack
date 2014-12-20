
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };

// exports.add_page = function(req, res){
//   res.render(
// }

exports.add = function(req, res){
  res.render('add')
}

exports.add_page = function(req,res) {
  var models = require('../models/');
  var title = req.body.title;
  var body = req.body.content;
  var generateUrlName = function(title) {
    if (typeof title != "undefined" && title !== "") {
      // Removes all non-alphanumeric characteres from name
      // And make spaces underscore
      return title.replace(/[\s]/ig,"_").replace(/[^\w]/ig,"");
    } else {
      // Generates random 5 letter string
      return Math.random().toString(36).substring(2,7);
    }
  };
  var url_name = generateUrlName(title);
  console.log(title)
  console.log(body)
  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `body` and `url_name` variables here

  var p = new models.Page({ "title": title, "body":body, "url_name": url_name, "points_to": ["a"], "most_recent": "last"});
  p.save();
  res.redirect('/')
};

exports.show_content = function(req, res){
  var models = require('../models/');
  var url_name = req.params.url_name;
  models.Page.find({url_name: url_name, "most_recent": "last"}, function(err, docs){
    if(docs.length >1){
      res.render('disamb', {content: docs})
    }
    else{
      res.render('new_page', {content: docs[0]})
    }
  });
}

exports.edit = function(req, res){
  var models = require('../models/');
  var idnumber = req.params.idnumber;
  models.Page.find({_id: idnumber}, function(err, docs){
    res.render('edit', {content: docs[0]})
  });
}

exports.edit_page = function(req, res){
  console.log("we're in the edit_page function")
  var models = require('../models/');
  var body = req.body.content;
  var idnumber = req.params.idnumber;
  models.Page.find({_id: idnumber}, function(err, docs){
    docs[0].points_to.push(idnumber+" "+docs[0].url_name)
    docs[0].most_recent = "notlast"
    docs[0].save();
    var p = new models.Page({ "title": docs[0].title, "body": body, "url_name": docs[0].url_name, "points_to": docs[0].points_to, "most_recent": "last"});
    p.save();
  })
  res.redirect('/')
}

exports.deleter = function(req, res){
  var models = require('../models/');
  var idnumber = req.params.idnumber;
  models.Page.find({_id: idnumber}, function(err, docs){
    docs[0].remove()
  })
  res.redirect('/')
}

exports.shows = function(req, res){
  var models = require('../models/');
  var idNumber = req.params.idnumber;
  var url_name = req.params.url_name;
  models.Page.find({url_name: url_name, _id: idNumber}, function(err, docs){
    res.render('new_page', {content: docs[0]})
  })
}

exports.past_versions = function(req, res){
  var models = require('../models/');
  var idNumber = req.params.idnumber;
  models.Page.find({_id: idNumber}, function(err, docs){
    res.render('past_versions', {content: docs[0]})
  })
}

exports.pasty = function(req, res){
  var models = require('../models/');
  var url_name = req.params.url_name;
  var idnumber = req.params.idnumber;
  models.Page.find({url_name: url_name, _id: idnumber}, function(err, docs){
    res.render('pasty', {content: docs[0]})
  })
}

exports.createUser = function(req, res){
  var models = require('../models/');
  var username = req.body.username;
  var password = req.body.password;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var email = req.body.email;
  var u = new models.User({"first_name": first_name, "last_name": last_name, "email": email, "username": username, "password": password})
  u.save();
  res.redirect("/")
}

exports.login_page = function(req, res){
  console.log("hello")
  res.render('login_page')
}
exports.new_user = function(req, res){
  res.render('new_user')
}


