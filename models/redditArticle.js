var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var redditArticleSchema = new Schema({
  
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

var redditArticle = mongoose.model("redditArticle", redditArticleSchema);

module.exports = redditArticle;