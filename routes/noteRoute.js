const express = require("express")
const {NoteModel} = require("../models/notemodel")
const {auth} = require("../middleware/auth.middleware")

const noteRouter = express.Router()
// Creating A note
noteRouter.post("/create", auth, async(req, res)=>{
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.send({"msg":"new note has been added"})
    } catch (error) {
        res.send({"error":error})
    }
})

// rading all notes
noteRouter.get("/", auth, async(req, res)=>{
    try {
        const notes = await NoteModel.find()
        res.send({"Notes":notes})
    } catch (error) {
        res.send({"msg":error})
    }
})

// Updating a note
noteRouter.patch("/update/:noteID", auth, async(req, res)=>{
    const {noteID} = req.params
    try {
        await NoteModel.findByIdAndUpdate({_id:noteID}, req.body)
        res.send({"msg":`note hasbeen updated of id ${noteID}`})
    } catch (error) {
        res.send(error)
    }
})

// delete a note
noteRouter.delete("/update/:noteID", auth, async(req, res)=>{
    const {noteID} = req.params
    try {
        await NoteModel.findByIdAndDelete({_id:noteID}, req.body)
        res.send({"msg":`note has been deleted of id ${noteID}`})
    } catch (error) {
        res.send(error)
    }
})

module.exports = {noteRouter}