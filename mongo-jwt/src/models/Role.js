import mongoose from "mongoose";

export const ROLE = ["user", "admin", "moderator"];
const roleSchema = new mongoose.Schema({
    name: String
}, {
    versionKey: false
});

export default mongoose.model('Role', roleSchema);