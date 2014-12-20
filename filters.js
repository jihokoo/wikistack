var models = require('./models/');
module.exports = function(swig) {

  var page_link = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = doc.url_name;
    }
    return "<a href='/wiki/"+doc.url_name+"'>"+link_name+"</a>";
  };
  page_link.safe = true;

  var markdown = function(body){
    var marked = require('marked')
    var markedString = marked(body)

    return markedString

  }
  markdown.safe = true


  var past_versions = function(doc){
    var link_name = "";
    if(doc.points_to.length > 1){
      var objectArray = doc.points_to.slice(1);
      objectArray.forEach(function(element){
        link_name += "<a href='/wiki/"+element.split(" ")[1]+"/"+element.split(" ")[0]+"/pasty'>"+element.split(" ")[0]+"</a><br>"
      })
    }else{
      return "<span>Sorry, there are no past versions.</span>"
    }
    return link_name
  }

  past_versions.safe = true
  swig.setFilter('past_versions', past_versions);
  swig.setFilter('markdown', markdown);

  swig.setFilter('page_link', page_link);
};
