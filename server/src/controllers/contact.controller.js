const sanitizeHtml = require('sanitize-html');
const { validationResult } = require('express-validator');
const emailService = require('../services/email.service');

const handleContactForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    try {
        // Sanitizar el input antes de enviarlo por correo
        const sanitizedMessage = sanitizeHtml(message, {
            allowedTags: [],
            allowedAttributes: {}
        });

        // Usar el servicio para enviar los correos de forma paralela
        await Promise.all([
            emailService.sendAdminNotification(name, email, subject, sanitizedMessage),
            emailService.sendCustomerConfirmation(name, email, sanitizedMessage)
        ]);

        res.status(200).json({ message: 'Mensaje y confirmación enviados con éxito.' });
    } catch (error) {
        console.error('Error al procesar el formulario de contacto:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud.' });
    }
};

module.exports = {
    handleContactForm
};