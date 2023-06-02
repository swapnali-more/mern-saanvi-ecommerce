import mongoose from "mongoose";
import UsersMessage from "../models/usersMessage";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// Set JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Fetch the users
export const fetchUsers = async (req: any, res: any) => {
    try {
        const users = await UsersMessage.find();
        //res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

// Create a new user
export const createUser = async (req: any, res: any) => {
    console.log(req.body)
    const { userName, userEmail, userPassword, userConfirmPassword, isAdmin } = req.body;

    try {
        if (!userName || !userEmail || !userPassword || !userConfirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await UsersMessage.findOne({ userEmail, userName });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" })
        }

        const hashPassword = await bcrypt.hash(userPassword, 12);
        const hashConfirmPassword = await bcrypt.hash(userConfirmPassword, 12);

        // Create a new user object
        const newUser = await UsersMessage.create({
            userName,
            userEmail,
            userPassword: hashPassword,
            userConfirmPassword: hashConfirmPassword,
            isAdmin,
        });

        const savedUser = await newUser.save(); // Save the user to the database

        // Create a JWT token with user's email and ID
        const token = jwt.sign({ email: newUser.userEmail, id: newUser._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ message: 'User created successfully', user: savedUser, token });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Invalid data sent in request." })
    }
}

// Login user
export const loginUser = async (req: any, res: any) => {
    const { userEmail, userPassword } = req.body;

    try {
        // Check if email and password are provided
        if (!userEmail || !userPassword) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user exists in the database
        const existingUser = await UsersMessage.findOne({ userEmail });

        if (!existingUser) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if the entered password matches the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(userPassword, existingUser.userPassword);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Create a JWT token with user's email and ID
        const token = jwt.sign(
            { email: existingUser.userEmail, id: existingUser._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send a response with the user object and token
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};
