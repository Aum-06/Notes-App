import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password); 

    if (isMatch) {
      const token = jwt.sign({user }, process.env.JWT_SECRET)
      console.log(token);
      
      return res.json({ success: true, token });
    } else {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


const signUpUser = async (req, res) => {
  console.log("Incoming request body:", req.body);

  try {
    const { name, email, password } = req.body;

    console.log("name:", name, "email:", email, "password:", password);

    let exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({user:createdUser},process.env.JWT_SECRET)
    console.log(token);
    

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: createdUser,
    });
  } catch (error) {
    console.error("Error in signUpUser:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { _id, name, email } = req.user;
    console.log('User data from req.user:', { _id, name, email });

    // Return user data directly from req.user
    const responseData = {
      user: {
        fullName: name,
        email: email,
        _id: _id
      }
    };

    console.log('Response data:', responseData);
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { loginUser, signUpUser, getUser };

