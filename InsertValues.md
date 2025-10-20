
## Insertar valores 

```
db.categories.insertMany([
  { categoryId: "CAT001", name: "Ropa" },
  { categoryId: "CAT002", name: "Calzado" },
  { categoryId: "CAT003", name: "Accesorios" }
]);
```

```
db.products.insertMany([
  {
    productId: "PROD001",
    name: "Camiseta básica",
    price: 20,
    stock: 50,
    categories: ["CAT001"]
  },
  {
    productId: "PROD002",
    name: "Pantalón jean",
    price: 45,
    stock: 30,
    categories: ["CAT001"]
  },
  {
    productId: "PROD003",
    name: "Zapatillas deportivas",
    price: 70,
    stock: 25,
    categories: ["CAT002"]
  },
  {
    productId: "PROD004",
    name: "Gorra clásica",
    price: 15,
    stock: 40,
    categories: ["CAT003"]
  }
]);
```

```
db.users.insertMany([
  {
    userId: "USER001",
    username: "Franco Torres",
    email: "franco@example.com",
    password: "54321",
    createdAt: new Date()
  },
  {
    userId: "USER002",
    username: "Lucía Gómez",
    email: "lucia@example.com",
    password: "12345",
    createdAt: new Date()
  }
]);
```

```
db.orders.insertMany([
  {
    orderId: "ORD001",
    userId: "USER001",
    products: [
      { productId: "PROD001", quantity: 2, price: 9600 },
      { productId: "PROD003", quantity: 1, price: 38000 }
    ],
    status: "paid",
    total: 110,
    createdAt: new Date()
  },
  {
    orderId: "ORD002",
    userId: "USER002",
    products: [
      { productId: "PROD002", quantity: 1, price: 2222},
      { productId: "PROD004", quantity: 2, price: 5400}
    ],
    status: "pending",
    total: 75,
    createdAt: new Date()
  }
]);

```

```
db.reviews.insertMany([
  {
    reviewId: "REV001",
    productId: "PROD001",
    userId: "USER001",
    rating: 5,
    comment: "Excelente calidad, muy cómoda.",
    createdAt: new Date()
  },
  {
    reviewId: "REV002",
    productId: "PROD003",
    userId: "USER002",
    rating: 4,
    comment: "Muy buenas, pero un poco caras.",
    createdAt: new Date()
  },
  {
    reviewId: "REV003",
    productId: "PROD004",
    userId: "USER001",
    rating: 5,
    comment: "Ideal para el verano, me encantó.",
    createdAt: new Date()
  }
]);

```