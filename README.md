# Trabajo Práctico: E-commerce MongoDB
Materia: Administración y Gestión de Base de Datos 

**Este proyecto consiste en implementar un sistema básico de e-commerce en MongoDB**
- Creación de colecciones y validaciones de esquema ($jsonSchema)  
- Relaciones entre colecciones y referencias  
- Inserción y consulta de datos  
- Agregaciones y estadísticas con $lookup, $project y $facet  
- Índices: únicos, compuestos y de texto  
- Transacciones para operaciones atómicas  
- Vistas (createView)  
- Validaciones avanzadas y reglas de negocio  
- Change Streams para auditoría en tiempo real  
- Campos calculados en documentos  
- Exportación/importación de bases

## Pasos de instalación:

## Construir Imagen de Docker
```
docker build -t mi-mongo .
```

## Levantar contenedor
```
docker run -d -p 27017:27017 --name mongo-test mi-mongo
```

## Abrir terminal interactiva de mongo
```
winpty docker exec -it mongo-test mongosh

```

