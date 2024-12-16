import dotenv from 'dotenv';

// Cargar las variables desde el archivo .env
dotenv.config();

// Validar que todas las variables requeridas están definidas
const requiredEnvVars = ['PORT', 'DB_PORT','DB_NAME','DB_HOST', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

export const config = {
  port: process.env.PORT,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
};
