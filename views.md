## Vistas (views) - Es una colección virtual que no guarda datos, sino muestra el resultado de una agregación ya hecha

```
db.createView(
  "orders_full_view", // nombre de la vista
  "orders", // colección base
  [
    // unir usuario
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "userId",
        as: "userInfo"
      }
    },
    { $unwind: "$userInfo" },

    // unir productos (dentro del array de products)
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "productId",
        as: "productDetails"
      }
    },

    // campos que queremos mostrar
    {
      $project: {
        _id: 0,
        orderId: 1,
        "userInfo.name": 1,
        "userInfo.email": 1,
        products: 1,
        productDetails: 1,
        total: 1,
        status: 1,
        createdAt: 1
      }
    }
  ]
);
```

## Llamar Vista
```
db.orders_full_view.find().pretty();
```