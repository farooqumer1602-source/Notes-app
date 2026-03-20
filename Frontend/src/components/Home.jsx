import axios from 'axios';
import React, { useState , useEffect } from 'react'
import NoteModel from './NoteModel';

const Home = () => {
  const [notes, setnotes] = useState([]);
  const [error , seterror] = useState("");
  const [isModelopen, setisModelopen] = useState(false);
  const [editnote, seteditnote] = useState(null);
  useEffect(() => {
    const fetchNotes = async ()=>{
      try{
       const token = localStorage.getItem('token');
       if(!token) return;
       const {data} = await axios.get('/api/notes',{
        headers: { Authorization: `Bearer ${token}` },
       })
       setnotes(data)
       console.log(data)
      }catch(error){
        console.log(error)
        seterror('Fail to fetch notes')
      }
    }
    fetchNotes()
  }, []);
  
  const handleEdit = (note)=>{
    seteditnote(note);
    setisModelopen(true)
  }

  const handleDelete =async (id) =>{
    try{
      const token = localStorage.getItem('token');
      if(!token){
        console.log('No Authorized. Token not found');
      }
       await axios.delete(`/api/notes/${id}`,{
        headers: { Authorization: `Bearer ${token}` },
      })
      setnotes( notes.filter((note)=> note._id !== id))
    }catch(err){
      seterror('Failed to delete note')
    }
  }

  const handlesavenote= (newNote) => {
    if (editnote) {
      setnotes(
        notes.map((note) => (note._id === newNote._id ? newNote : note))
      );
    } else {
      setnotes([...notes, newNote]);
    }

    seteditnote(null);
    setisModelopen(false);
  };
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-500">
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <NoteModel isopen={isModelopen}
      onclose={()=> {setisModelopen(false); seteditnote(null)}} 
      note ={editnote} onsave={handlesavenote}/>
      <button
        onClick={() => setisModelopen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gray-800 text-white text-3xl rounded-full shadow-lg hover:bg-gray-900 flex items-center justify-center"
      >
        <span className="flex items-center justify-center h-full w-full pb-1">
          +
        </span>
      </button>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {notes.map((note) => (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md" key={note._id}>
            <h3 className="text-lg font-medium text-white mb-2">
              {note.title}
            </h3>
            <p className="text-gray-300 mb-4">{note.description}</p>
            <p className="text-sm text-gray-400 mb-4">
              {new Date(note.updatedAt).toLocaleString()}
            </p>
            <div className="flex space-x-2">
              <button
               onClick={() => handleEdit(note)}
                className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
        </div>
  )
}

export default Home
