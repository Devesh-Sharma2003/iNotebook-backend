const express = require("express");
const router = express.Router();
const { NotesSchema } = require("../models/Notes");
const { fetchUser } = require("../middleware/FetchUser");

router.get("/fetchNotesByUserId", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const notes = await NotesSchema.findAll({
      where: {
        userId,
      },
      attributes:{exclude:['userId']}
    });
    res.status(200).send({
      status: true,
      message: "Notes feched successfully",
      result: notes,
    });
  } catch (err) {
    res.send(err);
  }
});

router.post("/createNote", fetchUser, async (req, res) => {
  try {
    const note = await NotesSchema.create({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      userId: req.user.id,
    });
    res.status(201).send({
      status: true,
      message: "Note created successfully",
      result: note.id,
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/getNoteById/:noteId", fetchUser, async (req, res) => {
  try {
    const {noteId}=req.params;
    const note=await NotesSchema.findOne({
        where:{
            id:noteId,
            userId: req.user.id
        },
        attributes:{exclude:['userId']}
    })
    if(!note){
        res.status(400).send({
            status:true,
            message:"No such note exist!"
        })
    }
    res.status(200).send({
        status:true,
        message:"Note fetched successfully",
        result:note
    })
  } catch (err) {
    res.send(err);
  }
});

router.delete("/deleteNoteById/:noteId", fetchUser, async(req, res)=>{
    try{
        const {noteId}=req.params;
        const note=await NotesSchema.findOne({
            where:{
                id:noteId,
                userId:req.user.id
            }
        })
        if(!note){
            res.status(400).send({
                status:false,
                message:"No such note exist"
            })
        }
        await note.destroy();
        res.status(200).send({
            status:true,
            message:"Note deleted successfully!"
        })
    }catch(err){
        res.send(err);
    }
});

router.put("/updateNoteById/:noteId", fetchUser, async(req, res)=>{
    try {
        const {noteId}=req.params;
        const note=await NotesSchema.findOne({
            where:{
                id:noteId,
                userId: req.user.id
            }
        })
        if(!note){
            res.status(400).send({
                status:true,
                message:"No such note exist!"
            })
        }
        console.log(note);
        if(req.body.title){
            note.title=req.body.title
        }
        if(req.body.description){
            note.description=req.body.description
        }
        if(req.body.tags){
            note.tags=req.body.tags
        }
        console.log(note)
        await note.save();
        res.status(200).send({
            status:true,
            message:"Note updated successfully!"
        })
    }catch(err){
        res.send(err);
    }
})

// router.get("/getNotesByTags/:tagName", fetchUser, async(req, res)=>{
//     const {tagName}=req.params;
//     try{
//     const notes=await NotesSchema.findAll({
//         include:{
//             where:{
//                 tags:tagName,
//                 userId:req.user.id
//             }
//         }
//     })
//     if(!notes){
//         res.status(200).send({
//             status:true,
//             message:"No note exist in such tag!"
//         })
//     }
//     res.status(200).send({
//         status:true,
//         message:"Notes fetched successfully",
//         result:notes
//     })
// }catch(err){
//     res.status(400).send({
//         status:"false",
//         message:""+err
//     })
// }
// })

module.exports = router;
