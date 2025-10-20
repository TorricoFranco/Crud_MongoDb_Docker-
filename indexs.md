## Índices únicos - Evita duplicados en los identificadores:

```
// Usuarios
db.users.createIndex({ userId: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true }); // email también debe ser único

// Productos
db.products.createIndex({ productId: 1 }, { unique: true });

// Categorías
db.categories.createIndex({ categoryId: 1 }, { unique: true });

// Pedidos
db.orders.createIndex({ orderId: 1 }, { unique: true });

// Reviews
db.reviews.createIndex({ reviewId: 1 }, { unique: true });
```

- Ejemplo de consultas:

```
db.users.find({ userId: "u1" });
db.users.find({ email: "correo@ejemplo.com" });
```


## Índices compuestos - Optimiza las consultas con filtros y ordenamientos múltiples:
```
// Buscar productos por categoría y ordenar por precio
db.products.createIndex({ categories: 1, price: 1 });

// Buscar pedidos por usuario y estado
db.orders.createIndex({ userId: 1, status: 1 });

// Reviews por producto y rating
db.reviews.createIndex({ productId: 1, rating: -1 }); // -1 para ordenar de mayor a menor
```

- Ejemplo de consultas:

**Productos por categoría y ordenados por precio:**
```
db.products.find({ categories: "bebidas" }).sort({ price: 1 });
```

**Pedidos por usuario y estado:**
```
db.orders.find({ userId: "u1", status: "paid" });
```


**Reviews por producto y rating:**
```
db.reviews.find({ productId: "p1" }).sort({ rating: -1 });
```


## Índices parciales - Solo indexan documentos que cumplan ciertas condiciones, ahorrando espacio y acelerando consultas
```
// Solo productos con stock > 0
db.products.createIndex(
  { price: 1, stock: 1 },
  { partialFilterExpression: { stock: { $gt: 0 } } }
);


// Solo pedidos pagados
db.orders.createIndex(
  { status: 1, createdAt: 1 },
  { partialFilterExpression: { status: "paid" } }
);
```

**$gt →  “greater than” → mayor que.**

- Ejemplo de consultas:
```
db.products.find({ stock: { $gt: 0 }, price: { $lt: 500 } });
db.orders.find({ status: "paid" }).sort({ createdAt: -1 });
```



## Índices de texto - full-text search
```
// Búsqueda por nombre de producto
db.products.createIndex({ name: "text" });

// Búsqueda por comentarios en reviews
db.reviews.createIndex({ comment: "text" });
```

- score que indica qué tan relevante es el documento según la coincidencia con la palabra buscada.

- $meta: "textScore" → indica que este campo debe contener la puntuación de relevancia que MongoDB asigna al documento según la búsqueda full-text.

- Ejemplo de consultas:
```
db.products.find({ $text: { $search: "jugo" } }, { score: { $meta: "textScore" } })
           .sort({ score: { $meta: "textScore" } });

db.reviews.find({ $text: { $search: "excelente" } }, { score: { $meta: "textScore" } })
           .sort({ score: { $meta: "textScore" } });
```

```
$text: { $search: "jugo" }
```
- Busca documentos cuyo campo name (porque indexaste { name: "text" }) contenga la palabra "jugo".

```
{ score: { $meta: "textScore" } }
```
- Devuelve un campo virtual llamado score que indica qué tan relevante es el documento según la coincidencia con la palabra buscada.

```
.sort({ score: { $meta: "textScore" } })
```
- Ordena los resultados de mayor a menor relevancia, es decir, primero los que más coinciden con la palabra buscada.


## Verificar uso de índices
```
db.products.find({ categories: "bebidas", price: { $lt: 500 } })
           .explain("executionStats");

```
- Si dice IXSCAN, la consulta usa índice
- si dice COLLSCAN, todavía hace un escaneo completo.

