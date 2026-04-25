import { comparePassword, hashPssword } from "../utils/bcrypt.js";
import { loginValid, registerValid } from "../utils/use.validation.js";
import User from "../model/user.modal.js";
import { createToken, verifyToken } from '../utils/jwt.js'

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = (req.body);

    const result = registerValid.safeParse({ name, email, password });

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        error: result.error.errors
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists", error: true });
    }
    const hashedPassword = await hashPssword(password);


    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    const token = await createToken(email, user._id);

    res.status(201).json({
      message: "User created successfully",
      token: token,
      error: false
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: true });
  }
};


export const checkUser = async (req, res) => {
  try {
    const { email, password } = (req.body);

    const result = loginValid.safeParse({ email, password });

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        error: result.error.errors
      });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const dataPassword = existingUser.password;
      const matchPassword = await comparePassword(password, dataPassword)
      const token = createToken(email, existingUser._id);
      if (matchPassword) {
        return res.status(200).json({ message: "login success", token: token, error: false });
      }
      else {
        return res.status(400).json({ message: "Password are incorrect", error: true });
      }
    } else {
      return res.status(400).json({ message: "Your account are not register", error: true });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: true });
  }
};

export const passwordUpdate = async (req, res) => {
  try {
    const { email, password } = (req.body);

    const result = loginValid.safeParse({ email, password });

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        error: true
      });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //    const dataPassword= existingUser.password;
      const newPassword = await hashPssword(password);
      const newdata = await User.findByIdAndUpdate(existingUser._id, {
        password: newPassword
      }, { new: true });

      return res.status(200).json({ message: "Update success", error: false });

    } else {
      return res.status(400).json({ message: "Your account are not register", error: true });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: true });
  }
};


export const getUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
        error: true,
      });
    }
    // Bearer token split
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
        error: true,
      });
    }


    let decoded;

    try {
      decoded = await verifyToken(token);
    } catch (tokenError) {
      return res.status(401).json({
        message: "Token expired or invalid",
        error: true,
      });
    }

    const user = await User.findOne({ email: decoded.email }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    return res.status(200).json({
      message: "User fetched",
      user,
      error: false,
    });

  } catch (error) {
    console.log("getUser error:", error.message);

    return res.status(500).json({
      message: "Server error",
      error: true,
    });
  }
};


export const updateUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const { name } = req.body;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
        error: true,
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid token format",
        error: true,
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
        error: true,
      });
    }

    let decoded;

    try {
      decoded = await verifyToken(token);
    } catch (tokenError) {
      return res.status(401).json({
        message: "Token expired or invalid",
        error: true,
      });
    }

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (req.file) {
      updateData.image = `uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(decoded.id, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    return res.status(200).json({
      message: "User updated",
      user,
      error: false,
    });
  } catch (error) {
    console.log("updateUser error:", error.message);

    return res.status(500).json({
      message: "Server error",
      error: true,
    });
  }
};