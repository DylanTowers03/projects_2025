import jwt from 'jsonwebtoken';
import { config } from '../config.js';
export const validateToken = (req, res, next) => {  
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    
    jwt.verify(token,config.TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({message: "Forbidden"});
        }
        req.user = user;
    });
    next();
} 
