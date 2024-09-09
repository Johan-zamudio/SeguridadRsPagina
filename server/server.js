const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // Cargar variables de entorno

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Asegúrate de servir archivos estáticos, si es necesario

// Configura el transporte de Nodemailer para Ferozo
const transporter = nodemailer.createTransport({
    host: 'smtp.ferozo.email',
    port: 587,
    secure: false, // Usar TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

app.post('/enviar-correo', (req, res) => {
    const { name, phone, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'contact@seguridadrys.cl',
        subject: 'Nuevo mensaje de contacto',
        text: `Nombre: ${name}\nNúmero Telefónico: ${phone}\nCorreo: ${email}\nMensaje: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error: error.toString() });
        }
        res.status(200).json({ success: true });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
