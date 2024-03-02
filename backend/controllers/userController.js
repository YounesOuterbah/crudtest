import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "user already exists" });
    }

    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    generateToken(res, newUser._id);

    await newUser.save();

    return res.status(201).json({ msg: "user created successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (userExist && isPasswordMatch) {
      generateToken(res, userExist._id);
      return res
        .status(200)
        .json({ _id: userExist._id, email: userExist.email, name: userExist.name });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json("user logged out successful");
};

export const getUserProfile = async (req, res) => {
  const { _id, name, email } = req.user;
  const user = {
    _id,
    name,
    email,
  };

  res.status(200).json(user);
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
