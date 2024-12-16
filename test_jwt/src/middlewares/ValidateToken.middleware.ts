import {Request,Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { config } from '../config/env';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
 }

export const validateToken= async (req:Request,res:Response,next:NextFunction)=>{
/*     const token = req.cookies?.token; // Buscar el token en la cookie llamada "token"

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    try {
      // Verificar el token
      const decoded = jwt.verify(token, config.jwtSecret)as JwtPayload; 
  
      // Agregar la información decodificada al objeto `req`
      req.body = {
        id: decoded.id,
        email: decoded.email,
      };
      console.log(decoded)
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    } */
  
      try {
        const token = req.cookies?.token;
    
        if (!token) {
          return res.status(401).json({ message: 'No token provided' });
        }
    
        const secretKey = config.jwtSecret;
    
        if (!secretKey) {
          throw new Error('JWT secret key is not defined');
        }
    
        // Verificar el token
        const decoded = jwt.verify(token, secretKey);
        (req as CustomRequest).token =decoded;
        next();
      } catch (error) {
        res.status(500).json({ message: 'Failed to authenticate token', error});
      }
};