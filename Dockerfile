# Imagen base oficial de Mongo
FROM mongo:7

# Directorio de trabajo
WORKDIR /docker-entrypoint-initdb.d

# Copiamos script de inicialización (se ejecuta automáticamente al crear el contenedor)
# Podés meter acá inserts o creación de usuarios
COPY init.js .

# Exponemos el puerto de Mongo
EXPOSE 27017