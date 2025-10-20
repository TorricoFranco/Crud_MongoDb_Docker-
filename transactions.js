// Ej de una transacción de una orden - los valores están hadcoreados


// Iniciar sesión
// Creamos un contexto de operaciones para la transaccion atomica 
// Todo o nada, si falla algo se cancela la transacción
const session = db.getMongo().startSession();

session.startTransaction();

try {
  const ordersColl = session.getDatabase("ecommerseDB").orders;
  const productsColl = session.getDatabase("ecommerseDB").products;

  // Crear un nuevo pedido para USER001
  const newOrder = {
    orderId: "ORD003",
    userId: "USER001",
    products: [
      { productId: "PROD002", quantity: 1, price: 45 } // Pantalón jean
    ],
    status: "pending", // Estado inicial
    total: 45,
    createdAt: new Date()
  };

  // Insertar pedido, pero no 100%, si falla la transación se decrementa
  ordersColl.insertOne(newOrder, { session });

  // Restar stock del producto
  const res = productsColl.updateOne(
    // Condicionl, mayor o igual a 1
    { productId: "PROD002", stock: { $gte: 1 } },
    // Incrementar un producto
    { $inc: { stock: -1 } },
    { session }
  );

  // Si ningún documento cumplio con el filtro significa que el stock del producto es menor a 1
  if (res.matchedCount === 0) {
    throw new Error("No hay stock suficiente para PROD002");
  }

  // Actualizar status del order
  ordersColl.updateOne(
    { orderId: newOrder.orderId },
    { $set: { status: "paid" } },
    { session }
  );

  // Confirmar la transacción
  session.commitTransaction();
  print("Pedido ORD003 creado y stock actualizado correctamente.");

} catch (error) {
  // Si falla algo, deshacer cambios
  print("Transacción abortada: " + error);
  session.abortTransaction();
} finally {
// Haya fallado o no la trnasacción se cierra la sesión
  session.endSession();
}
