const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");


let success = true;
// ROUTE - 0: get specific note of a user using  GET: /api/notes/fetchnote . login required

router.get("/fetchnote/:noteId", async (req, res) => {
try {

  const noteId = req.params.noteId;
  const note = await Notes.findOne({_id:noteId});
  if(!note){
    return res.status(400).json({message:"Note not found or does not belong to the user"})
  }
  res.json(note);
} catch (error) {
  return res.status(500).json({message:"internal server error"});
}
});
// ROUTE - 1: get the notes of a user using  GET: /api/notes/fetchallnotes . login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
try {
  const notes = await Notes.find({ user: req.user.id });
  if (!notes) {
    success = false;
    res
      .status(400)
      .json({success, error: "some error has occured while fetching ntoes" });
  }
  res.json(notes);
} catch (error) {
  console.log(error);
  return res.status(500).json({message:"internal server error"});
}
});

// ROUTE - 2: add a new note POST: /api/notes/addnote . login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log("Request headers:", req.headers);
    console.log("Raw body:", req.rawBody);
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty or undefined" });
    }

    console.log("in notes.js backend ROUTE handler ADD NOTE",req.body);
    console.log("in notes.js backend ROUTE handler ADD NOTE",req.body,req.body.title,req.body.description,req.body.tag)
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error("Add note error:", error);
      return res.status(500).json({ error: "internal server error" });
    }
  }
);

// ROUTE - 3: delete a note POST: /api/notes/deletenote/:noteId . login required

router.delete("/deletenote/:noteId",fetchuser,async(req,res)=>{
try {
  const userId = req.user.id;
  const noteId = req.params.noteId;
  const note = await Notes.findOne({_id:noteId,user:userId});
  if(!note){
    return res.status(400).json({message:"Note not found or does not belong to the user"})
  }
  await Notes.findByIdAndDelete(noteId);
  return res.status(200).json({message:"note was delete successfully"});
  
} catch (error) {
  console.log(error);
  res.status(500).json({message:"internal server error"});
}

})


// ROUTE - 4: update an existing note PUT : /api/notes/updatenote/:noteId . login required

router.put("/updatenote/:noteId",async (req,res)=>{
  console.log("Request headers:", req.headers);
  console.log("Raw body:", req.rawBody);
  
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is empty or undefined" });
  }

  console.log("in notes.js backend ROUTE handler EDIT NOTE",req);
  console.log("in notes.js backend ROUTE handler EDIT NOTE",req.params.noteId);
  console.log("in notes.js backend ROUTE handler EDIT NOTE",req.body);
  console.log("in notes.js backend ROUTE handler EDIT NOTE",req.body,req.body.title,req.body.description,req.body.tag)
try {
  const noteId = req.params.noteId;
  const oldNote = await Notes.findOne({_id:noteId})
  if(!oldNote){
    return res.status(400).json({message:"Note not found or does not belong to the user"})
  }
  const {title,description,tag} = req.body;
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};
  await Notes.findByIdAndUpdate(noteId,newNote);
  res.status(200).json({message:"note was updated successfully",newNote});
} catch (error) {
  console.error("Update note error:", error);
  return res.status(500).json({message:"internal server error"});
}
})

module.exports = router;
// findOne returns the first object that matches the query, returns null if none are found
// find returns an array of all the objects that match that query. returns an empty array if none are found
// findById
