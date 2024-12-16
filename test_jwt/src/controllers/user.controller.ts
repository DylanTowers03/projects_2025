import { Request, Response } from 'express';
import {database} from '../database/db';
import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
import { User } from '../models/User'; // Importa el modelo Sequelize de User
import {createAccessToken} from '../libs/jwt'

export class UserController {
  // Crear usuario (registro)
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      const token= await createAccessToken({id:user.id, email:user.email})
    //res.status(201).json({ message: 'Usuario registrado', id: user.id });
    res.cookie('token', token)
    res.json({
        message: 'user created successfully',user
    })
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
  }

  // Iniciar sesión
  async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

    const token = await createAccessToken({id:user.id, email:user.email})
    res.cookie('token', token)
    res.json({
        message: 'Inicio de sesion exitoso'
    })
      //res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
  }

  // Leer todos los usuarios
  async getUsers(_req: Request, res: Response) {
    try {
      const users = await User.findAll({ attributes: ['id', 'username', 'email'] }); // Excluir contraseña
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
  }

  // Leer un usuario por ID
  async getUserById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, { attributes: ['id', 'username', 'email'] }); // Excluir contraseña
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
  }

  // Actualizar un usuario
  async updateUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [updated] = await User.update(
        { username, email, password: hashedPassword },
        { where: { id } }
      );

      if (updated === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  }

  // Eliminar un usuario
  async deleteUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const deleted = await User.destroy({ where: { id } });
      if (deleted === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
  }
}
