# API de la cafetería del CRUI

## Cómo ejecutar el proyecto
1_ Abrir la terminal en la carpeta proyecto.
2_ Ejecutar 'npm install' en la terminal de Visual Code(para instalar dependencias)
3_ Ejecutar 'node index.js' para que se habilite el servidor(o 'npm run dev' si está configurado)
4_ El servidor correrá en 'http://localhost:3000.'

## Endpoints
- 'GET /' -> Mensaje de bienvenida
- 'GET /api/productos' -> Lista todos los productos
- 'GET /api/productos/:id' -> Busca un producto por su ID
- 'POST /api/productos' -> Crea un producto (requiere JSON con nombre, precio, categoria)
- 'DELETE /api/productos/:id' -> Elimina un producto
- 'GET /api/resumen' -> Devuelve cantidad y precio promedio