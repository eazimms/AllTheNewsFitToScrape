var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var edhNoteSchema = new Schema({
  
  title: String,
  
  body: String
});

var edhNote = mongoose.model("edhNote", edhNoteSchema);

module.exports = edhNote;