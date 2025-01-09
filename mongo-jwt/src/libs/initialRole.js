import Role from "../models/Role.js";
import User from "../models/Users.js";
import { config } from "../config.js";

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;
        const values = await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "moderator" }).save(),
            new Role({ name: "admin" }).save()
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
}

export const createAdmin = async () => {
    try {
        const user = await User.findOne({ email: config.adminEmail });
        const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });
        if (!user) {
            await User.create({
                username: config.adminUsername,
                email: config.adminEmail,
                password: await User.encryptPassword(config.adminPassword),
                roles: roles.map(role => role._id)
            });
            console.log('Admin User Created!');
        } else {
            return;
        }
    } catch (error) {
        console.error(error);
    }
}

createRoles();
createAdmin();