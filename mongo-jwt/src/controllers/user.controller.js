import User from '../models/Users.js';
import Role from '../models/Role.js';

export const createUser = async (req, res) => {
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
  
    return res.status(200).json(savedUser);
  }

export const getUsers = async (req, res) => {
    const users = await User.find();
    return res.json(users);
  };
  
  export const getUser = async (req, res) => {
    const user = await User.findById(req.params.userId);
    return res.json(user);
  };