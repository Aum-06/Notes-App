import noteModel from "../models/note.model.js";
import userModel from "../models/user.model.js";
const addNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "title and content are required",
      });
    }
    const newNote = await noteModel.create({
      title,
      content,
      user: req.user._id,
    });
    console.log("User ID from token:", req.user._id);  // Add this line to check

    const user = await userModel.findById(req.user._id);
    user.notes.push(newNote._id);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "note successfully created",
      note: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

const editNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;

    const updatedNote = await noteModel.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res
        .status(400)
        .json({ success: false, message: "note not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "note updated successfully",
        note: updatedNote,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
    
        const deletedNote = await noteModel.findByIdAndDelete(noteId );
    
        if (!deletedNote) {
          return res
            .status(400)
            .json({ success: false, message: "note not found" });
        }
    
        return res
          .status(200)
          .json({
            success: true,
            message: "note deleted successfully",
          });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Server error", error: error.message });
      }
};

const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id; 
    const notes = await noteModel.find({ user: userId }); 

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
    });
  }
};


export { addNote, deleteNote, editNote ,getAllNotes};
