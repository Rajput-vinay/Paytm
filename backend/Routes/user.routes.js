const express = require("express");
const { z } = require('zod');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const  {User}  = require('../model/User.model');
const { authMiddleware } = require("../middlewares/auth.middlewares");
const { Account } = require("../model/Account");

const userRouter = express.Router();

// Define Zod schemas for validation
const signupBody = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
});

const signinBody = z.object({
    username: z.string().email(),
    password: z.string(),
});

// Sign up route
userRouter.post('/signup', async (req, res) => {
    const { success, error } = signupBody.safeParse(req.body);
    
    if (!success) {
        return res.status(400).json({
            message: "Invalid input data",
            error: error.errors,
        });
    }

    try {
        const existingUser = await User.findOne({ username:req.body.username });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already taken",
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
        });

        // Create an account for the user with a random balance
        await Account.create({
            userId: newUser._id,
            balance: 1 + Math.random() * 10000
        });

        const token = jsonwebtoken.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '12h',
        });

        return res.status(201).json({
            message: "User created successfully",
            token: token,
        });
    } catch (error) {
        console.error("Signup error:", error); // Log the error
        return res.status(500).json({
            message: "Server error, please try again later.",
        });
    }
});

// Sign in route
userRouter.post('/signin', async (req, res) => {
    const { success, data, error } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid input data",
            error: error.errors,
        });
    }

    try {
        const existingUser = await User.findOne({ username: data.username });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(data.password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        const token = jsonwebtoken.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: '12h',
        });

        return res.status(200).json({
            message: "Logged in successfully",
            token: token,
        });
    } catch (error) {
        console.error("Signin error:", error); // Log the error
        return res.status(500).json({
            message: "Server error, please try again later.",
        });
    }
});

// Update user details
const updateBody = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional(),
});

userRouter.put('/', authMiddleware, async (req, res) => {
    const { success, error, data } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid input data",
            error: error.errors,
        });
    }

    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Please log in or sign up first",
            });
        }

        // If password is provided, hash it before updating
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        // Update user data
        const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            data,
            { new: true }
        );

        return res.status(200).json({
            message: "User details updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Update error:", error); // Log the error
        return res.status(500).json({
            message: "Server error, please try again later.",
        });
    }
});

// Bulk retrieval of users
userRouter.get('/bulk', authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } },
                { lastName: { "$regex": filter, "$options": "i" } }
            ]
        });

        res.json({
            users: users.map(user => ({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error("Bulk retrieval error:", error); // Log the error
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = {
    userRouter,
};
