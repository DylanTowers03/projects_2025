import User from '../models/Users.js';
import Role from '../models/Role.js';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, config.secretPassword,{
        expiresIn: 86400 // 24 hours
    });

    res.json({ token });
    
}

export const signIn = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).populate("roles");

    if (!user) return res.status(400).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(req.body.password, user.password);

    if (!matchPassword) return res.status(401).json({ token: null, message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, config.secretPassword, {
        expiresIn: 86400 // 24 hours
    });

    res.json({ token });
}