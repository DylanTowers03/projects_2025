import jwt from "jsonwebtoken";
import { config } from "../config.js";
import User from "../models/Users.js";
import Role from "../models/Role.js";


export const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, config.secretPassword, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = decoded.id;
        next();
    });
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }

    return res.status(403).json({message: "Require Admin Role"});
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }

    return res.status(403).json({message: "Require Moderator Role"});
}