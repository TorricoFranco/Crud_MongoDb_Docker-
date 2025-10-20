# Change Streams - escuchan los eventos de una coleción 
- Son similres a los triggers en una bd relacional

## Evitar cncelar pedidos ya pagados

- Dentro de watch indicamos que cambios queremos observar
```
const changeStream = db.orders.watch([
  {
    $match: {
      operationType: "update", // Solo operaciones de tipo update
      "updateDescription.updatedFields.status": "cancelled" // Solo cuando el campo sttus cambie a cancelled
    }
  }
]);

// Escucha cuando se cumple la condición y dispara un evento
changeStream.on("change", (change) => { 
  const orderId = change.documentKey._id;
  const updatedStatus = change.updateDescription.updatedFields.status;

  // Obtenemos el pedido actual
  const order = db.orders.findOne({ _id: orderId });

  if (order.status === "paid" && updatedStatus === "cancelled") {
    print(`No se puede cancelar el pedido ${orderId} que ya está pagado`);
    // Se revierte el cambio 
    db.orders.updateOne({ _id: orderId }, { $set: { status: "paid" } });
  }
});
```



## Detectar Stock Negativo

```
const productWatcher = db.products.watch([
  { $match: { operationType: "update" } }
]);

productWatcher.on("change", (change) => {
  const id = change.documentKey._id;
  const updatedFields = change.updateDescription.updatedFields;

  if (updatedFields.stock < 0) {
    print(`Stock negativo detectado en producto ${id}`);
    db.products.updateOne({ _id: id }, { $set: { stock: 0 } });
  }
});
```

## Auditoria para inserts de Products y update tanto de stock y de price de un producto
```
const productStream = db.products.watch([
  {
    $match: {
      $or: [
        { operationType: "insert" },
        { 
          operationType: "update",
          "updateDescription.updatedFields.price": { $exists: true } 
        },
        { 
          operationType: "update",
          "updateDescription.updatedFields.stock": { $exists: true } 
        }
      ]
    }
  }
]);

productStream.on("change", (change) => {
  // Guardamos toda la info del evento en una colección
  db.auditLogs.insertOne({
    collection: "products",
    operation: change.operationType,
    documentId: change.documentKey._id,
    updatedFields: change.updateDescription?.updatedFields || null,
    fullDocument: change.fullDocument || null,
    timestamp: new Date()
  });
});

```

## Auditoria Ineert de Orders

```
const ordersStream = db.orders.watch([
  {
    $match: {
      operationType: "insert"
    }
  }
]);

ordersStream.on("change", (change) => {
  db.auditLogs.insertOne({
    collection: "orders",
    operation: change.operationType,
    documentId: change.documentKey._id,
    updatedFields: change.updateDescription?.updatedFields || null,
    fullDocument: change.fullDocument || null,
    timestamp: new Date()
  });
});

```


## campo total de order calculado automáticamente
```
const ordersStream = db.orders.watch([
  {
    $match: {
      $or: [
        { operationType: "insert" },
        { operationType: "update" }
      ]
    }
  }
]);

ordersStream.on("change", change => {
  const orderId = change.documentKey._id;
  const products = change.fullDocument.products;

  const total = products.reduce((acc, p) => acc + p.quantity * p.price, 0);

  db.orders.updateOne({ _id: orderId }, { $set: { total: total } });
});

```

