
## Relaciones entre colecciones
```
User  → Orders
   1  → Muchos

Order  → Products
Muchos → Muchos

Product → Categories
Muchos  → Muchos

Product → Reviews
   1    → Muchos

Review → User 
Muchos →  1
```

## Productos con sus categorías
```
db.products.aggregate([
  {
    $lookup: {
      from: "categories",           
      localField: "categories",        
      foreignField: "categoryId",      
      as: "categoryDetails"           
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      stock: 1,
      categoryDetails: { name: 1, description: 1 }
    }
  }
]);
```


## Orders con detalles de usuarios y productos
```
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "userId",
      as: "userDetails"
    }
  },
  { $unwind: "$userDetails" },
  {
    $lookup: {
      from: "products",
      localField: "products.productId",
      foreignField: "productId",
      as: "productDetails"
    }
  },
  {
    $project: {
      _id: 0,
      orderId: 1,
      status: 1,
      total: 1,
      createdAt: 1,
      "userDetails.username": 1,
      "userDetails.email": 1,
      productDetails: { name: 1, price: 1 }
    }
  }
]);

```

## Reviews con información del producto y del usuario
```
db.reviews.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "productId",
      as: "productDetails"
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "userId",
      as: "userDetails"
    }
  },
  {
    $project: {
      _id: 0,
      reviewId: 1,
      "productDetails.name": 1,
      rating: 1,
      comment: 1,
      "userDetails.username": 1
    }
  }
]);

```

## Reviews con información del producto y del usuario
```
db.orders.aggregate([
  {
    $facet: {
      // Total de ventas por usuario
      ventasPorUsuario: [
        { $group: { _id: "$userId", totalGastado: { $sum: "$total" } } }
      ],

      // Cantidad de pedidos por estado
      pedidosPorEstado: [
        { $group: { _id: "$status", cantidad: { $count: {} } } }
      ],

      // Productos más vendidos
      productosMasVendidos: [
        { $unwind: "$products" },
        { $group: { _id: "$products.productId", totalUnidades: { $sum: "$products.quantity" } } },
        { $sort: { totalUnidades: -1 } },  // -1 -> de mayotr a menor
        { $limit: 5 }
      ]
    }
  }
]);

```




