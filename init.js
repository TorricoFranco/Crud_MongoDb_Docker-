// Selecciona o crea la base "myapp"
db = db.getSiblingDB('myapp');

// Crea la colección "products"
db.createCollection('products');

// Inserta datos de prueba
db.products.insertMany([
  { name: "Camiseta", price: 20 },
  { name: "Pantalón", price: 35 }
]);
