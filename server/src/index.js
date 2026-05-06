// To use different .env files for development and production:
// 1. Install the 'dotenv-cli' package: npm install dotenv-cli --save-dev
// 2. Update your start scripts in package.json:
//    "scripts": {
//        "start:dev": "dotenv -e .env.dev -- node src/index.js",
//        "start:prod": "dotenv -e .env.prod -- node src/index.js"
//    }
// 3. Create .env.dev and .env.prod files with the respective environment variables.
// 4. Use `npm run start:dev` for development and `npm run start:prod` for production.

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Rutas importadas , el servicio de mail se movio a su propia carpeta
const contactRoutes = require('./routes/contact.routes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        process.env.FRONTEND_URL || 'https://portafolio-willian-fernando-sullca.vercel.app'
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Definición de rutas estructuradas
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;