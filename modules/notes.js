const mongoose=require("mongoose")

const notesSchema = new mongoose.Schema({
  user:{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'},
    title: { type: String },
    description: { type: String},
    tag: { type: String,default:"General" },
    }
  );
 module.exports = mongoose.model('Note', notesSchema);
