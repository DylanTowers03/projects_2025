# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
COPY src ./src
# Copiar el archivo .env en la imagen
COPY .env /app/.env


# Instala las dependencias
RUN npm install
CMD npm start