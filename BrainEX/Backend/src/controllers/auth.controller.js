import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import blackListModel from "../model/blacklist.model.js";
import { sendMail } from "../services/email.service.js";

/**
 * @route POST api/auth/register
 * @description Registers a user to the website
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function registerController(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next({
        status: 401,
        message: "Fill all field correctly !",
      });
    }
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (isUserAlreadyExists) {
      return next({
        status: 409,
        message: "User already exists !",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email: email,
      username: username,
      password: hashPassword,
      verified: false,
    });

    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const mailOptions = {
      to: email,
      subject: "Welcome to BrainEX 🚀",
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    
    <table align="center" width="600" style="background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <tr>
        <td style="background: linear-gradient(90deg, #4f46e5, #9333ea); color: white; text-align: center; padding: 20px;">
          <h1 style="margin: 0;">BrainEX</h1>
          <p style="margin: 5px 0 0;">Welcome aboard 🚀</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 30px; color: #333;">
          <h2 style="margin-top: 0;">Hey there 👋</h2>
          <p>
            We’re super excited to have you join <strong>BrainEX</strong>!  
            Explore, learn, and build amazing things with us.
          </p>

          <p>Click the button below to activate your account:</p>

          <!-- Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/api/auth/activate?token=${token}"
              style="background: #4f46e5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Activate Account
            </a>
          </div>

          <p>
            If you have any questions, feel free to reach out anytime.
          </p>

          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>BrainEX Team</strong>
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #777;">
          This is an automated email, please do not reply.
        </td>
      </tr>

    </table>
  </div>
  `,
      text: `Welcome to BrainEX! We're super excited to have you join us. Explore, learn, and build amazing things with us. Click the link below to activate your account: http://localhost:3000/activate`,
    };

    const mailSent = await sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "User registered successfully !",
      mailSent,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route POST api/auth/login
 * @description Logs in a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({
        status: 401,
        message: "Fill all fields correctly !",
      });
    }

    const user = await userModel
      .findOne({
        email: email,
      })
      .select("+password");

    if (!user) {
      return next({
        status: 404,
        message: "Incorrect email or password !",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next({
        status: 400,
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    return res.status(201).json({
      success: true,
      message: "User logged in successfully !",
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/logout
 * @description description
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function logoutController(req, res, next) {
  try {
    const { token } = req.cookies;
    await blackListModel.create({
      token: token,
    });
    res.clearCookie("token");
    return res.status(201).json({
      success: true,
      message: "User logout Successfully !",
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route GET api/auth/get-me
 * @description Fetches the user detail
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getMeController(req, res, next) {
  try {
    const { id } = req.user;
    if (!id) {
      return next({
        status: 404,
        message: "Id not found !",
      });
    }
    const user = await userModel.findById(id);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully !",
      user,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST api/auth/activate
 * @description Verifies a user gmail
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function emailVerify(req, res, next) {
  const { token } = req.query;
  if (!token) {
    return next({
      status: 404,
      message: "Token is required to activate account",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      email: decoded.email,
    });
    if (!user) {
      return next({
        status: 404,
        message: "Invalid User or token !",
      });
    }

    if (user.verified) {
      return next({
        status: 400,
        message: "User already verified",
      });
    }
    user.verified = true;
    await user.save();

    const html = `
<div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px;">
  <table align="center" width="600" style="background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <tr>
      <td style="background-color: #4F46E5; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">BrainEX</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px; text-align: center;">
        <div style="font-size: 60px;">✅</div>
        <h2 style="color: #1a1a2e; font-size: 22px; margin: 20px 0 10px;">Email Verified!</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Your email has been successfully verified.<br/>You can now log in to your account.
        </p>
        <a href="http://localhost:5173/login" style="display: inline-block; margin-top: 24px; padding: 12px 32px; background-color: #4F46E5; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
          Login Now
        </a>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f4f6f8; padding: 20px; text-align: center;">
        <p style="color: #aaa; font-size: 12px; margin: 0;">© 2026 BrainEX. All rights reserved.</p>
      </td>
    </tr>
  </table>
</div>
`;

    res.send(html);
  } catch (err) {
    return next({
      status: 400,
      message: "Error occured",
    });
  }
}
