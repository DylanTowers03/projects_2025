import ROLES  from '../models/Role.js';
import User from '../models/Users.js';


export const checkUserExisted = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ message: 'The user already exists' });
        }
        const email = await User.findOne({ email: req.body.email });
        if (email) {
            return res.status(400).json({ message: 'The email already exists' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const checkRolesExisted = (req, res, next) => {
    try {
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!ROLES.includes(req.body.roles[i])) {
                    return res.status(400).json({
                        message: `Role ${req.body.roles[i]} does not exist`
                    });
                }
            }
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
    
}