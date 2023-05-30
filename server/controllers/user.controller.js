import mongoose from "mongoose";
import User from "../models/user.model.js";


// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      password: password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const savedUser = await newUser.save();
    res.status(201).json({ user: savedUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { username, password }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const users = await User.find();
    res.status(200).json({ user: deletedUser, users: users });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};