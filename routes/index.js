var models = require('../models/index');
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log("this is the slash")
  var models = require('../models/');
  models.Page.find({"most_recent": "last"}, function(err, docs) {
    res.render('index', {docs: docs});
  });
};
