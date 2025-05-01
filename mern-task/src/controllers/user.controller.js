import Users from "../models/Users.js";

export class UserController {
    static async getUsers(req, res) {
        try {
        const users = await Users.find();
        res.status(200).json(users);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    
    static async getUserById(req, res) {
        try {
        const user = await Users.findById(req.params.id);
        res.status(200).json(user);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    
    static async createUser(req, res) {
        try {
        const newUser = new Users(req.body);
        await newUser.save();
        res.status(201).json(newUser);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    
    static async updateUser(req, res) {
        try {
        await Users.findByIdAndUpdate(req.params.id, req.body);
        res.status(204).json();
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    
    static async deleteUser(req, res) {
        try {
        await Users.findByIdAndDelete(req.params.id);
        res.status(204).json();
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    }