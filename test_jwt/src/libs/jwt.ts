import {config} from '../config/env'
import jwt from 'jsonwebtoken'; 
const secretPass= config.jwtSecret || 'test_jwtpass'
export function createAccessToken(payload:any){
    return new Promise((resolve,reject)=>{
        jwt.sign(payload, secretPass, { expiresIn: '1h' },
            (err,token)=>{
                if (err) reject(err);
                resolve(token)
            }
        );
    })
    
}
