var mongoose = require("mongoose"); 

var Schema = mongoose.Schema; 

var cArticleSchema = new Schema({
  title: {
    type: String, 
    required: true
  }, 

  link: {
    type: String, 
    required: true
  }, 

  note: {
    type: Schema.Types.ObjectId, 
    ref: "edhNotes"
  }
}); 

var cArticle = mongoose.model("cArticle", cArticleSchema); 

module.exports = cArticle; 