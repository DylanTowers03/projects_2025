import User from "../models/Users.js";
import bcrypt from "bcrypt";
import {CreatedAccessToken} from '../libs/jwt.js';
import jwt from "jsonwebtoken";
import { config } from "../config.js";


export class AuthController {
    static async register(req, res) {
        try {
            const {username, email, password}= req.body;
            const userFound = await User.findOne({email});
            
            if (userFound) {
                return res.status(400).json({message: "The email is already in use"});
            }
            
            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: passwordHash
            });

            const userSaved = await newUser.save();

            const token = await CreatedAccessToken({id:userSaved._id});

            /* const token = jwt.sign(
              { id: userSaved._id },
              config.TOKEN,
              {
                expiresIn: "1d",
              },
              (err, token) => {
                if (err) {
                  res.status(500).json({ message: err.message });
                }

                res.cookie("token", token);
                res.json({ userSaved });
              }
            ); */
            res.cookie('token',token);
            res.json({userSaved});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    
    static async login(req, res) {
        try {
            const {email, password}= req.body;
            const userFound = await User.findOne({email});
            if (!userFound) {
                return res.status(400).json({message: "User not found"});
            }
            const passwordMatch = await bcrypt.compare(password, userFound.password);
            if (!passwordMatch) {
                return res.status(400).json({message: "Password incorrect"});
            }
            const token= await CreatedAccessToken({id:userFound.id})
            res.cookie("token", token)
            res.json({userFound});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async logout(req, res) {
        try {
            res.clearCookie("token");
            res.json({message: "Logout successfully"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async profile(req, res) {
        try {
            const userFound = await User.findById(req.user.id);
            if (!userFound) {
                return res.status(400).json({message: "User not found"});
            }
            res.json({userFound});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }   

}