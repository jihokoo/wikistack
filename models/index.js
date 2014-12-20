var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Page, User;
var Schema = mongoose.Schema;

var pageSchema = new Schema({
  title:  String,
  url_name: String,
  body:   String,
  date: { type: Date, default: Date.now },
  status: Number,
  points_to: Array,
  most_recent: String,
});

var userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String,
});

userSchema.methods.validPassword = function(pwd){
  return (this.password ===pwd);
}

Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);

module.exports = {"Page": Page, "User": User};



//we create schemas, then we create
//we do this by var schemaName = new Schema({})
//Models from them
// var name = mongoose.model("name", schemaname)


//so .find will pass in the document(object) to the
//callback function

//instances of models are documents
//mongoose documents represent a one-to-one mapping
//to documents (its like a fiduciary reflection)
//that we can treat like the actual document
//documents are essentially objects
//they have their own built-in instance methods

// we can also create secondar indexes
// this is basically assigning an object to the
// value of a property in the schema object
// this object will have its own property/values

