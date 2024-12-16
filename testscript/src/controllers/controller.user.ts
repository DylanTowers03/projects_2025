import { Request, Response } from 'express';
import { User, UserI } from '../models/User';

export class UserController {
    public async test(req: Request, res: Response) {
        try {
            res.send('hola, método test para User')
        } catch (error) {
            res.status(500).json({ msg: 'Error', error });
        }
    }

    public async getAllUser(req: Request, res: Response) {
        try {
            const users: UserI[] = await User.findAll();
            res.status(200).json({users});
        } catch (error) {
            res.status(500).json({ msg: 'Error', error });
        }
    }

    public async createUser(req: Request, res: Response) {
        const { nombre, edad } = req.body;

        try {
            const user = await User.create({ nombre, edad });
            res.status(201).json({user});
        } catch (error) {
            res.status(500).json({ msg: 'Error', error });
        }
    }

    public async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, edad } = req.body;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ msg: 'User no encontrado' });
            }
            await user.update({ nombre, edad });
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({ msg: 'Error', error });
        }
    }

    public async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ msg: 'User no encontrado' });
            }
            await user.destroy();
            res.status(200).json({ msg: 'User eliminado' });
        } catch (error) {
            res.status(500).json({ msg: 'Error', error });
        }
    }
}
