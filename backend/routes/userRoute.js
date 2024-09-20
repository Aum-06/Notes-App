import express from "express";
import { loginUser, signUpUser,getUser } from "../controllers/userController.js";
import requireAuth from "../middlewares/requireAuth.js";

const userRouter = express.Router();

userRouter.post("/signup", signUpUser);

userRouter.post("/login", loginUser);

userRouter.get("/get-user",requireAuth,getUser)

export default userRouter;
