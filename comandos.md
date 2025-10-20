## Ver que base de dato se esta usando

```
db
```

## Listar todas las bases de datos

```
show dbs
```

## Ver todas las colecciones de la base actual

```
show collections
```

## Ver el esquema y validaciones de una colección

```
db.getCollectionInfos({ name: "products" })
```

## Ver todos los documentos de una colección

```
db.products.find()
```

## O más formateado

```
db.products.find().pretty()
```

## Filtrar con condiciones

```
db.products.find({ stock: { $gt: 0 } })
db.users.find({ email: /gmail\.com$/ })
```

## Ver información general de una colección

```
db.products.stats()
```

## Contar documentos
```
db.products.countDocuments()
```

## Mostrar la estructura de un documento

```
db.products.findOne()
```

### Operadores de agregción

## $lookup – para relacionar colecciones
```
db.products.aggregate([
  {
    $lookup: {
      from: "categories",        // la colección a unir
      localField: "categories",  // campo de products que referencia categoryId
      foreignField: "categoryId",// campo de categories a comparar
      as: "categoryDetails"      // nombre del nuevo array que traerá la info
    }
  }
])
```

## $project – Para mostrar solo los campos que querés
```
db.products.aggregate([
  {
    $project: {
      _id: 0,       // oculto el _id
      name: 1,      // muestro nombre
      price: 1,
      categoryDetails: 1
    }
  }
])
```

## $match – Para filtrar documentos por condiciones
```
db.orders.aggregate([
  {
    $match: { status: "paid" } // solo pedidos pagados
  }
])
```

## $group - para agrupar y resumir datos
```
db.orders.aggregate([
  { 
    $group: { 
      _id: "$userId",              // agrupa por usuario
      totalGasto: { $sum: "$total" }, // suma los totales de cada usuario
      pedidosHechos: { $count: {} }   // cuenta cuántos pedidos hizo
    }
  }
])
```

## $facet - para ejecutar varios pipelines en paralelo
```
db.orders.aggregate([
  {
    $facet: {
      porEstado: [
        { $group: { _id: "$status", cantidad: { $count: {} } } }
      ],
      porUsuario: [
        { $group: { _id: "$userId", total: { $sum: "$total" } } }
      ]
    }
  }
])

```

