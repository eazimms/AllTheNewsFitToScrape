var mongoose = require("mongoose");
// Create new schema for notes. 
var Schema = mongoose.Schema;

var edhNoteSchema = new Schema({
  
  title: String,
  
  body: String
});

var edhNote = mongoose.model("edhNote", edhNoteSchema);

module.exports = edhNote;