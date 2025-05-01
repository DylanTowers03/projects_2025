export class TaskController {
    static async create(req, res) {
        res.json({message: "Task created"});
    }
    static async read(req, res) {
        res.json({message: "Task read"});
    }
    static async update(req, res) {
        res.json({message: "Task updated"});
    }
    static async delete(req, res) {
        res.json({message: "Task deleted"});
    }
}