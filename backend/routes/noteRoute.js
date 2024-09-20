import express from "express";
import { addNote,deleteNote,editNote,getAllNotes } from "../controllers/noteController.js";
import requireAuth from "../middlewares/requireAuth.js";

const noteRouter=express.Router();

noteRouter.use(requireAuth); // Protect all routes in this router


noteRouter.post('/add-note',addNote);
noteRouter.put('/edit-note/:noteId',editNote);
noteRouter.delete('/delete-note/:noteId',deleteNote);
noteRouter.get('/notes',getAllNotes)

export default noteRouter;