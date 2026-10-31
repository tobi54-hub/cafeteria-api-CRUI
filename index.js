const express = require('express');
const app = express();

// Esto permite que la aplicación pueda recibir datos en formato JSON
app.use(express.json());

// la base de datos de la cafeteria

const productos = [
    { id: 1, nombre: "Café con leche", precio: 2200, categoria: "Bebidas" },
    { id: 2, nombre: "Medialuna", precio: 1000, categoria: "Comida" },
    { id: 3, nombre: "Tostado de JyQ", precio: 4000, categoria: "Comida" },
    { id: 4, nombre: "Agua mineral", precio: 1200, categoria: "Bebidas" },
];

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('Bienvenido a la Cafetería del CRUI');
});

// Lista de productos
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

// Buscar un producto por su ID
app.get('/api/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);//Convierto el id a número
    const producto = productos.find(p => p.id === id);//Busco el Array

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
});

// Agregar un nuevo producto
app.post('/api/productos', (req, res) => {
    const { nombre, precio, categoria } = req.body;

    // Validaciones pedidas en el TP
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'El nombre del producto es obligatorio' });
    }
    if (typeof precio !== 'number' || precio <= 0) {
        return res.status(400).json({ error: 'El precio debe ser un número mayor a cero' });
    }

    //Crear nuevo ID
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

    const nuevoProducto = { 
        id: nuevoId, 
        nombre: nombre, 
        precio: precio, 
        categoria: categoria 
    };

    productos.push(nuevoProducto);//lo agrego al array
    res.status(201).json(nuevoProducto);//201 significa "Creado"
});

// Filtrar productos por categoría
app.get('/api/productos', (req, res) => {
    const { categoria } = req.query;
    if (categoria) {
        const filtrados = productos.filter(p => p.categoria === categoria);
        return res.json(filtrados);
    }
    res.json(productos);
});

// Borrar un producto
app.delete('/api/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    productos.splice(index, 1);
    res.json({ message: 'Producto eliminado correctamente' });
});

// Resumen
app.get('/api/resumen', (req, res) => {
    const cantidad = productos.length;
    let sumaPrecios = 0;
    productos.forEach(p => sumaPrecios += p.precio);
    const precioPromedio = cantidad > 0 ? sumaPrecios / cantidad : 0;

    res.json({cantidad: cantidad, precioPromedio: precioPromedio});
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});