import User from "../model/user.modal.js";
import UserCart from "../model/userCart.modal.js";
import { verifyToken } from "../utils/jwt.js";

export const addCart = async (req, res) => {
  try {
    const { email, phone, address, cart } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
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

    if (!email || !phone || !address || !cart) {
      return res.status(400).json({
        message: "All fields are required",
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
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    const cartstore = new UserCart({
      userid: decoded.id,
      name: user.name,
      email,
      phone,
      address,
      cart,
    });

    const savedCart = await cartstore.save();

    return res.status(201).json({
      message: "Cart added successfully",
      error: false,
      data: savedCart,
    });
  } catch (error) {
console.log("ADD CART ERROR =>", error);
  console.log("FULL ERROR =>", error);
    return res.status(500).json({
      message: "Server error",
      error: true,
    });
  }
};