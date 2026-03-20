import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";

const NoteModel = ({isopen , note , onclose , onsave}) => {
    const [title, settitle] = useState("");
    const [description , setdescription] = useState("");
    const [error, seterror] = useState("");

    useEffect(() => {
        settitle(note ? note.title : "");
        setdescription(note ? note.description : "");
        seterror("")
    }, [note]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        seterror("No authentication token found. Please log in");
        return;
      }

      const payload = { title, description };
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (note) {
        const { data } = await axios.put(
          `/api/notes/${note._id}`,
          payload,
          config
        );
        onsave(data);
      } else {
        const { data } = await axios.post("/api/notes", payload, config);
        onsave(data);
      }
      settitle("");
      setdescription("");
      seterror("");
      onclose();
    } catch (err) {
      console.log("Note save error");
      seterror("Failed to save error");
    }
  };

   if(!isopen) return null
    return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">
          {note ? "Edit Note" : "Create Note"}
        </h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              placeholder="Note Title"
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder="Note Description"
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {note ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onclose}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModel;
