## Consigna Ecommerse basico

Ejecutar inserts, consultas y updates verificables.
Crear la base “myapp” con la colección “products

Crear relaciones entre colecciones (referencias)
Agregar validaciones de esquema (opcional)
Crear índices para optimizar consultas (opcional)
Las propiedades deben tener como valor otra colección
Ejemplo: Un producto puede tener múltiples categorías

Entidades como colecciones:
Productos (products)
Categorías (categories)
Usuarios (users)
Pedidos (orders)
Comentarios (reviews)

Relaciones entre colecciones:
Un producto puede pertenecer a múltiples categorías
Un pedido puede contener múltiples productos
Un usuario puede tener múltiples pedidos
Un producto puede tener múltiples comentarios

Validaciones de esquema (opcional):
Asegurar que los campos obligatorios estén presentes
Validar tipos de datos (números, cadenas, arrays, etc.)
Restringir valores permitidos (por ejemplo, estados de pedidos)

El trabajo práctico consiste en modelar un sistema de base de datos en MongoDB que simule un e-commerce básico. Se deben crear colecciones para productos, categorías, usuarios, pedidos y comentarios, definiendo relaciones entre ellas: un producto puede pertenecer a varias categorías, un pedido puede contener múltiples productos, un usuario puede tener varios pedidos y un producto puede tener múltiples comentarios. Cada colección debe tener validaciones usando $jsonSchema para tipos de datos, campos obligatorios y valores restringidos. Luego, insertar registros de prueba y realizar consultas con $lookup y $facet para mostrar relaciones y estadísticas. Crear índices compuestos, parciales, únicos y de texto, y analizar su rendimiento con explain("executionStats"). Implementar una transacción que cree un pedido, descuente stock y marque como pagado, y una vista con createView para mostrar pedidos con detalle de usuario y productos. Agregar una validación que impida marcar como cancelado un pedido con pago, un Change Stream para auditar inserts, y un campo total calculado en los pedidos. Finalmente, aplicar un soft delete a productos, crear un usuario solo lectura, exportar/importar la base y hacer una búsqueda full-text con ranking de relevancia.


## Dividir Subtareas

0️⃣ Crear colecciones y validaciones

- Definir products, categories, users, orders y reviews.
- Agregar $jsonSchema para tipos de datos, campos obligatorios y valores restringidos.

1️⃣ Insertar datos de prueba

- Productos, categorías, usuarios, pedidos y reseñas.
- Verificar referencias entre colecciones.

2️⃣ Relaciones y consultas básicas

- Unir colecciones con $lookup.
- Filtrar y proyectar campos importantes.

3️⃣ Consultas estadísticas

- Total de pedidos por usuario.
- Productos más vendidos.
- Promedio de rating por producto.

4️⃣ Índices

- Únicos, compuestos y de texto.

- Analizar rendimiento con explain().

5️⃣ Transacciones

- Crear pedido, descontar stock y marcarlo como pagado.

6️⃣ Vistas

- Combinar información de pedidos, usuarios y productos.

7️⃣ Validaciones avanzadas

- Evitar cancelar pedidos ya pagados.

- Validar estados de pedidos y stock negativo.

8️⃣ Change Streams

- Auditar inserts y actualizaciones importantes.

9️⃣ Campos calculados

- Calcular automáticamente el total de los pedidos.

🔟 Soft delete y usuario de solo lectura

- Marcar productos como eliminados sin borrarlos.
- Crear usuario con permisos de lectura.

1️⃣1️⃣ Export/Import y búsquedas full-text

- Exportar e importar la base.
- Búsquedas full-text con ranking por relevancia.