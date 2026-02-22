const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Register User
 */
async function registerController(req, res) {
    const {username, email, password} = req.body;

    /**
     * If User doesn't enter something it will return
     */
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please fill all the required fields !",
        });
    }

    /**
     * Checks if User already exists and if yes it will return
     */
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {
                email: email,
            },
            {
                username: username,
            },
        ],
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: `User already exists with the same ${isUserAlreadyExists.username === username ? "Username" : "Email"}`,
        });
    }

    /**
     * Hashes the password using bcrypt for security
     */
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
    });

    /**
     * Generates token and send it in the cookie
     */
    const token = jwt.sign(
        {
            username: username,
            email: email,
        },
        process.env.JWT_SECRET,
        {expiresIn: "7d"},
    );

    res.cookie("token", token);

    /**
     * Successfully registered User
     */
    res.status(201).json({
        message: "User registered sucessfully !",
        user,
    });
}

/**
 * Login User
 */
async function loginController(req, res) {
    const {username, email, password} = req.body;

    /**
     * If User doesn't enter something it will return
     */
    if (!password) {
        return res.status(400).json({
            message: "Please fill all the field correctly",
        });
    }

    /**
     * Finds user based on either username or email and if it doesnt exist it will return
     */
    const user = await userModel.findOne({
        $or: [
            {
                username: username,
            },
            {
                email: email,
            },
        ],
    });

    if (!user) {
        return res.status(404).json({
            message: "User not registered !",
        });
    }

    /**
     * Verifies the hashed password and if wrong returns
     */
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Incorrect Password !",
        });
    }

    /**
     * Creates token and send it in cookie
     */
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        },
    );

    res.cookie("token", token);

    /**
     * Logged in successfully
     */
    res.status(200).json({
        message: "Logged in successfully !",
        user,
    });
}

/**
 * Logout User
 */
async function logoutController(req, res) {
    res.clearCookie("token")

    return res.status(200).json({
        message: "User logout successfully !"
    })
}

/**
 * Get current logged-in user Details
 */
async function getMeController(req, res) {
    const userId = req.user.id
    /**
     * Finding user from Db using current user ID fetched from token
     */
    const user = await userModel.findById(userId)

    return res.status(200).json({
        message: "User fetched successfully !",
        user: {
            username: user.username,
            email: user.email,
        }
    })
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    getMeController
};
