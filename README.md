### Trabajo Práctico CRUD básico MongoDB en Docker
Materia: Administración y Gestión de Base de Datos 


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


## Comandos usados

```
use myapp
show dbs 
show collections
```

## Insertar Documento
```
db.products.insertOne({ name: "Coca de vidrio fria", price: 10000 })
db.products.insertMany([
  { name: "Camiseta", price: 20 },
  { name: "Pantalón", price: 35 }
])
```
##  Leer Documentos

```
db.products.find().pretty()
```
## Actualizar Documento 
```
db.products.updateOne({ name: "Camiseta" }, { $set: { price: 25 } })
```
## Eliminar Documento
```
db.products.deleteOne({ name: "Pantalón" })
```
