# Usa una imagen base oficial de Node.js
FROM node:18-alpine AS builder

# Crea el directorio de trabajo en el contenedor
WORKDIR /app

# Copia todos los archivos del monorepo
COPY . .

# Cambia al subdirectorio específico del servicio usando ARG
ARG SERVICE_NAME
WORKDIR /app/apps/${SERVICE_NAME}
RUN echo "Directorio de trabajo cambiado a /app/apps/${SERVICE_NAME}."

# Instala dependencias y construye el servicio
RUN npm install
RUN npm run build && echo "Build completado para ${SERVICE_NAME}."

# Etapa de producción
FROM node:18-alpine AS production
WORKDIR /app

# Copia las dependencias y la carpeta `dist` desde la fase de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/${SERVICE_NAME}/dist ./dist

# Expone el puerto
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
