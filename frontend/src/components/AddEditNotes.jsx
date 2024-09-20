import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import api from '../utils/api';

const AddEditNotes = ({ onClose, noteData, type ,setNotes}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title || "");  
      setContent(noteData.content || ""); 
    } else {
      setTitle("");
      setContent("");
    }
  }, [type, noteData]);

  const handleAddOrSaveNote = async () => {
    if (!title) {
      setError("Please enter title");
      return;
    }
    if (!content) {
      setError("Please enter content");
      return;
    }
    setError("");
    
    if (type === "edit") {
      // Save logic
      console.log("Saving note:", { title, content });
    } else {
      // Add logic
      console.log("Adding new note:", { title, content });
    }
    
    try {
      if (type === "edit") {
        const response = await api.put(`/note/edit-note/${noteData._id}`, { title, content });
        setNotes(prevNotes => prevNotes.map(note =>
          note._id === noteData._id ? response.data.note : note
        ));
      } else {
        const response = await api.post("/note/add-note", { title, content });
        console.log('API response:', response.data); // Debug the API response here

        setNotes(prevNotes => [...prevNotes, response.data.note]);
      }
      onClose();
    } catch (error) {
    console.error("Error saving note:", error.response?.data || error.message);  // Improved error logging
    }
  };

  return (
    <div className='relative'>
      <button
        className='flex items-center justify-center w-10 h-10 rounded-full absolute -top-3 -right-3 hover:bg-slate-100'
        onClick={onClose}
      >
        <MdClose className='text-xl text-slate-400 hover:text-black' />
      </button>
      <div className='flex flex-col gap-3'>
        <label className='input-label'>Title</label>
        <input
          type="text"
          placeholder='Title'
          className='text-2xl text-slate-950 outline-none'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className='input-label'>Content</label>
        <textarea
          type="text"
          rows={10}
          placeholder='Content'
          className='resize-none text-sm text-slate-950 bg-slate-100 outline-none p-2 rounded'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      {error && <p className='text-sm text-red-500 mt-2'>{error}</p>}
      <button className='primary-btn' onClick={handleAddOrSaveNote}>
        {type === 'edit' ? 'Save' : 'Add'} Note
      </button>
    </div>
  );
};

export default AddEditNotes;
