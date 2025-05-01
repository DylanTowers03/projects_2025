import jwt from "jsonwebtoken";
import { config } from "../config.js";


export async function CreatedAccessToken(payload) {
    return new Promise((resolve, reject)=>{
        jwt.sign(
            payload,
            config.TOKEN,
            {
                expiresIn: "1d",
            },
            (err,token) =>{
                if (err) {
                    reject(err)
                }
                resolve(token)
            }
        );
    });
}