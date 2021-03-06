var mongoose = require("mongoose");
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
  edhnote: {
    type: Schema.Types.ObjectId,
    ref: "edhNote"
  }
});

var edhArticle = mongoose.model("edhArticle", edhArticleSchema);

module.exports = edhArticle;