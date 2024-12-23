import {  pool} from "../db.js";
export class UserController {

    static async getUsers(req, res) {
        await pool.query("SELECT * FROM users", (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
        });
    }

    static async getUserById(req, res) {

        const id = req.params.id;
        await pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length == 0) {
            res.status(404).send("User not found");
        }
        res.status(200).json(results.rows);
        }
        );
    }

    static async createUser(req, res) {
        try {
            const data = req.body;
            await pool.query(
                "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
                [data.name, data.email],
                (error, results) => {
                    if (error) {
                    throw error;
                    }
                    //res.status(201).send(`User added with ID: ${results.insertId}`);
                    res.status(201).json(results.rows);
                });
        } catch (error) {
            if (error?.code === '23505') {
                res.status(409).send("User already exists");
            }
        }
        
    }
    static async updateUser(req, res) {
        const id = req.params.id;
        const data = req.body;
        await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3",
        [data.name, data.email, id],
        (error, results) => {
            if (error) {
            throw error;
            }
            res.status(200).send(`User modified with ID: ${id} \n`,results.rows);
        }
        );
    }

    static async deleteUser(req, res) {
        const id = req.params.id;
        await pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            res.status(404).send("User not found");
        }
        return res.json({ message: "User deleted" });
        });
    }
}