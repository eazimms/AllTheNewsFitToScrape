var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var gfArticleSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
  
  link: {
    type: String,
    required: true
  },
  
  edhnote: {
    type: Schema.Types.ObjectId,
    ref: "edhNote"
  }
});

var gfArticle = mongoose.model("gfArticle", gfArticleSchema);

module.exports = gfArticle;