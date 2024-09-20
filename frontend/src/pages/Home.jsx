import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { IoMdAdd } from "react-icons/io";
import AddEditNotes from "../components/AddEditNotes";
import Modal from "react-modal";
import api from "../utils/api";
import addNoteImg from "../assets/add-note.svg";
import EmptyCard from "../components/EmptyCard";

const Home = () => {
  const [notes, setNotes] = useState([]);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  useEffect(() => {
    // Fetch notes from the backend
    const fetchNotes = async () => {
      try {
        const response = await api.get("/note/notes");
        setNotes(response.data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const onClose = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  const handleEdit = (note) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: note,
    });
  };
  const handleDelete = async (noteId) => {
    try {
      await api.delete(`/note/delete-note/${noteId}`);
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={note.date}
              content={note.content}
              onEdit={() => handleEdit(note)}
              onDelete={() => handleDelete(note._id)}
            />
          ))}
        </div>

        <button
          className="size-16 flex items-center justify-center bg-primary rounded-lg hover:bg-blue-600 absolute right-10 bottom-10"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <IoMdAdd className="size-8 text-white" />
        </button>
        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=""
          className="w-[40%] m-h-3/4 bg-white rounded mx-auto mt-32 p-5 overflow-hidden"
        >
          <AddEditNotes
            onClose={onClose}
            noteData={openAddEditModal.data}
            type={openAddEditModal.type}
            setNotes={setNotes}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Home;
