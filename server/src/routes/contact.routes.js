const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const contactController = require('../controllers/contact.controller');

const router = express.Router();

const contactLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo más tarde.'
});

const contactValidation = [
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio').escape(),
    body('email').isEmail().withMessage('El correo electrónico no es válido').normalizeEmail(),
    body('subject').trim().notEmpty().withMessage('El asunto es obligatorio').escape(),
    body('message').trim().notEmpty().withMessage('El mensaje es obligatorio').escape()
];

// Definir la ruta POST (hereda el '/api/contact' desde el index)
router.post('/', contactLimiter, contactValidation, contactController.handleContactForm);

module.exports = router;