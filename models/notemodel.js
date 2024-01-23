const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    userId:{type:String},
    user:{type:String},
    title:{type:String, required:true},
    description:{type:String, required:true}
},{
    versionKey:false
})

const NoteModel = mongoose.model("1note", noteSchema)

module.exports = {NoteModel}