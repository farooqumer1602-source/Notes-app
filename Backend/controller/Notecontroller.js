const express  = require('express');
const Notes = require('../model/notemodel');


const Getallnotes = async (req,res)=>{
    try{
        const  notes = await Notes.find({CreatedBy: req.user._id})
        res.json(notes);
    }catch(err){
        console.error("Get all notes error: ", err);
    res.status(500).json({ message: "Server error" });
    }
}

const Createnote = async (req,res)=>{
    const {title,description} = req.body;
    try{
        if(!title || !description){
          return   res.status(400).json({message:'Please fill all fields'})
        }
        const note = await Notes.create({
            title,
            description,
            CreatedBy: req.user._id,
        })
        
        res.status(201).json(note)
    }catch(err){
        console.log(err)
         res.status(500).json({ message: "Server error" });
    }
};

const getnote = async (req,res)=>{
    try{
        const note = await Notes.findById(req.params.id);
        if(!note){
          return res.status(404).json({message:"Note not found"});
        }
    }catch(err){
         res.status(500).json({ message: "Server error" });
    }
}

const updatenote = async (req,res)=>{
    const {title, description} = req.body;
    try{
        const note = await Notes.findById(req.params.id);
        if(!note){
         return res.status(404).json({message:"Note not found"});
        }
    if(note.CreatedBy.toString() !== req.user._id.toString()){
        return res.status(404).json({message:"Not authorized"})
    }

    note.title = title || note.title;
    note.description = description || note.description;
    const updatedCode = await note.save();
    res.json(updatedCode);
    }catch(err){
         res.status(500).json({ message: "Server error" });
    }
};

const Deletenote = async (req,res)=>{
    try{
        const note = await Notes.findById(req.params.id);
        if(!note){
          return res.status(400).json({message:"Note Note found"});
        }
         if(note.CreatedBy.toString() !== req.user._id.toString()){
        return res.status(404).json({message:"Not authorized"})
    }
    await note.deleteOne();
    res.json({message:"Note is deleted"}) 
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = {Getallnotes, Createnote , getnote , updatenote , Deletenote}