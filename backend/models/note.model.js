import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timeStamps: true }
);

const noteModel=mongoose.models.note||mongoose.model('note',noteSchema)

export default noteModel
