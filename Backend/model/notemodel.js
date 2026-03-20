const mongoose = require('mongoose');


const NotesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    CreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usser',
        required:true
    },
},
{ timestamps: true }
);

const Notes = mongoose.model('Notes',NotesSchema );

module.exports = Notes