const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Caché para almacenar el template en memoria y no leer el disco en cada petición
const templates = {};

const loadTemplate = (fileName) => {
    if (!templates[fileName]) {
        const filePath = path.join(__dirname, '..', 'templates', fileName);
        templates[fileName] = fs.readFileSync(filePath, 'utf8');
    }
    return templates[fileName];
};

const srcHTML = (fileName, replacements) => {
    let html = loadTemplate(fileName);
    Object.keys(replacements).forEach(key => {
        html = html.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    });
    return html;
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

//1 Armado de correo para informacion del titular(puede ser diferente al user configurado que envia el correo y trenie las credenciales)
const sendAdminNotification = async (name, email, subject, message) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: `🚀 Nuevo Proyecto: ${subject} de ${name}`,
        html: srcHTML('admin-notification.html', { name, email, subject, message })
    });
};

//2 Replica personalizada para el interesado
const sendCustomerConfirmation = async (name, email, message) => {
    return transporter.sendMail({
        from: `"Willian S. | Dev Portfolio" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Confirmación de contacto - Portafolio Profesional',
        html: srcHTML('customer-reply.html', { name, message })
    });
};

module.exports = {
    sendAdminNotification,
    sendCustomerConfirmation
};