
### Trabajo Práctico Ecommerse básico MongoDB en Docker

```
use ecommerse-db
```

## Crear Colección products y sus validaciones

```
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "stock"],
      properties: {
        name: { 
          bsonType: "string", 
          description: "Debe ser una cadena" 
        },
        price: { 
          bsonType: "number", 
          minimum: 0, description: 
          "Debe ser positivo" 
        },
        stock: { 
          bsonType: "int", 
          minimum: 0 
        },
        categories: { 
          bsonType: ["array"], 
          items: { bsonType: "string" } 
        }
      }
    }
  }
})
```
## Modificar colección ya creada

```
db.runCommand({
  collMod: "products",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "stock", "productId"],
      properties: {
        productId: { 
          bsonType: "string", 
          description: "Identificador único legible del producto" },
        name: { 
            bsonType: "string", 
            description: "Debe ser una cadena" 
          },
          price: { 
            bsonType: "number", 
            minimum: 0, description: 
            "Debe ser positivo" 
          },
          stock: { 
            bsonType: "int", 
            minimum: 0 
          },
          categories: { 
            bsonType: ["array"], 
            items: { bsonType: "string" } 
          }
      }
    }
  }
})

```

## Crear colección categories y sus validaciones

```
db.createCollection("categories", {
  validator: {
    $jsonSchema: {   
      bsonType: "object",  
      required: ["categoryId", "name"],  
      properties: {
        categoryId: {
          bsonType: "string",
          description: "Identificador único legible de la categoría"
        },
        name: {
          bsonType: "string",
          description: "Nombre de la categoría"
        },
        description: {
          bsonType: "string",
          description: "Descripción opcional de la categoría"
        }
      }
    }
  }
})

```

## Crear colección users y sus validaciones

```
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "username", "email", "password"],
      properties: {
        userId: { 
          bsonType: "string", 
          description: "Identificador único del usuario" 
        },
        username: { 
          bsonType: "string", 
          description: "Nombre del usuario" 
        },
        email: { 
          bsonType: "string", 
          pattern: "^.+@.+$", 
          description: "Email válido" 
        },
        password: { 
          bsonType: "string", 
          description: "Contraseña hasheada" 
        },
        createdAt: {
          bsonType: "date",
          description: "Fecha de creación del usuario"
        }
      }
    }
  }
})

```


## Crear colección orders y sus validaciones

```
db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["orderId", "userId", "products", "status", "total"],
      properties: {
        orderId: { 
          bsonType: "string", 
          description: "Identificador único del pedido" 
        },
        userId: { 
          bsonType: "string", 
          description: "Referencia al usuario que hizo el pedido" 
        },
        products: { 
          bsonType: "array", 
          items: {
            bsonType: "object",
            required: ["productId", "quantity", "price"],
            properties: {
              productId: { bsonType: "string" },
              quantity: { bsonType: "int", minimum: 1 },
              price: { bsonType: "number", minimum: 0 }
            }
          }
        },
        status: {
          bsonType: "string",
          enum: ["pending", "paid", "shipped", "cancelled"],
          description: "Estado del pedido"
        },
        total: {
          bsonType: "number",
          minimum: 0
        },
        createdAt: {
          bsonType: "date"
        }
      }
    }
  }
})

```

## Crear colección reviews y sus validaciones

```
db.createCollection("reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["reviewId" ,"userId", "productId", "rating", "comment"],
      properties: {
        reviewId: {
          bsonType: "string",
          description: "Identificador único de la reseña"
        },
        userId: {
          bsonType: "string",
          description: "Referencia al usuario que hace la reseña"
        },
        productId: {
          bsonType: "string",
          description: "Referencia al producto reseñado"
        },
        rating: {
          bsonType: "int",
          minimum: 1,
          maximum: 5,
          description: "Puntuación del 1 al 5"
        },
        comment: {
          bsonType: "string",
          description: "Comentario del usuario"
        },
        createdAt: {
          bsonType: "date",
          description: "Fecha de creación de la reseña"
        }
      }
    }
  }
})

```