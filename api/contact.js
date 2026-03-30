const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        try {
            // Configurar el transporte de Nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Cambiar según el proveedor de correo
                auth: {
                    user: process.env.EMAIL_USER, // Configurar en las variables de entorno
                    pass: process.env.EMAIL_PASS, // Configurar en las variables de entorno
                },
            });

            // Configurar el correo
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'grupo@example.com', // Cambiar al grupo deseado
                subject: `Nuevo mensaje de contacto de ${name}`,
                text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
            };

            // Enviar el correo
            await transporter.sendMail(mailOptions);

            return res.status(200).json({ message: 'Mensaje enviado con éxito.' });
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ error: 'Error al enviar el mensaje.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Método ${req.method} no permitido.` });
    }
}