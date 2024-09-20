import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userModel from "./models/user.model.js";
import noteModel from "./models/note.model.js";
import userRouter from "./routes/userRoute.js";
import noteRouter from "./routes/noteRoute.js";

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);


app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

app.listen(port, () => {
  console.log("server running on port 3000");
});
