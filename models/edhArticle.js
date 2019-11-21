var mongoose = require("mongoose");
// Schema for the articles to go into 
var Schema = mongoose.Schema;

var edhArticleSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
  
  link: {
    type: String,
    required: true
  },
//  Notes for those articles. 
  edhnote: {
    type: Schema.Types.ObjectId,
    ref: "edhNote"
  }
});

var edhArticle = mongoose.model("edhArticle", edhArticleSchema);

module.exports = edhArticle;