var mongoose = require("mongoose"); 

var Schema = mongoose.Schema; 

var edhNoteSchema = new Schema({
  title: String, 

  body: String
}); 

var edhNotes = mongoose.model("EdhNote", edhNoteSchema); 

module.exports = edhNotes; 