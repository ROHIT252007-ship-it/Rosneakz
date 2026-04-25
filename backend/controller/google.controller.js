import { OAuth2Client } from 'google-auth-library';
import User from '../model/user.modal.js';
import { createToken } from '../utils/jwt.js';

const client = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'idToken is required',
      });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_WEB_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log(payload);
    const email = payload.email;
    const name = payload.name;
    const image = payload.picture;
    const googleId = payload.sub;
    const emailVerified = payload.email_verified;

    if (!emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Google email not verified',
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        image,
      });
    }

    const token =createToken(email,user._id)
    return res.status(200).json({
      success: true,
      message: 'Google login success',
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Google login failed',
      error: error.message,
    });
  }
};