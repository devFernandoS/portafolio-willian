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
const nodemailer = require('nodemailer');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const rateLimit = require('express-rate-limit');

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

// Rate limiter
const contactLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo más tarde.'
});

app.use('/api/contact', contactLimiter);

// Contact route
app.post('/api/contact', [
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio').escape(),
    body('email').isEmail().withMessage('El correo electrónico no es válido').normalizeEmail(),
    body('subject').trim().notEmpty().withMessage('El asunto es obligatorio').escape(),
    body('message').trim().notEmpty().withMessage('El mensaje es obligatorio').escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    try {
        const sanitizedMessage = sanitizeHtml(message, {
            allowedTags: [],
            allowedAttributes: {}
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `Nuevo mensaje de contacto de ${name} mediante Portafolio Web`,
            text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\nMensaje: ${sanitizedMessage}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Mensaje enviado con éxito.' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el mensaje.' });
    }
});

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