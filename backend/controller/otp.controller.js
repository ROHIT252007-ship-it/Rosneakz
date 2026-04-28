import User from "../model/user.modal.js";

// simple in-memory store
const otpStore = new Map();

// static OTP
const STATIC_OTP = "252007";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
        error: true,
      });
    }

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }


    otpStore.set(email, {
      otp: STATIC_OTP,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    return res.status(200).json({
      message: "OTP sent successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while sending OTP",
      success: false,
      error: true,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
        success: false,
        error: true,
      });
    }

    const savedOtp = otpStore.get(email);

    if (!savedOtp) {
      return res.status(400).json({
        message: "OTP not found or expired",
        success: false,
        error: true,
      });
    }

    if (Date.now() > savedOtp.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({
        message: "OTP expired",
        success: false,
        error: true,
      });
    }

    // IMPORTANT: convert to string
    if (savedOtp.otp !== otp.toString()) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
        error: true,
      });
    }

    otpStore.delete(email);

    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while verifying OTP",
      success: false,
      error: true,
    });
  }
};