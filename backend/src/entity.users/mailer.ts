import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_APP_PASSWORD } from '../config/environment'

const transporter = nodemailer.createTransport({
    service: 'gmail', // o utiliza otro servicio de correo SMTP
    auth: {
        user: EMAIL, // Tu dirección de correo electrónico
        pass: EMAIL_APP_PASSWORD, // La contraseña del correo o App Password si usas 2FA
    },
});

export const sendMail = async (email: string, password: string) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Registro éxitoso en Break & Focus',
        text: `Bienvenido a Break & Focus !!
      Su registro ha sido exitoso. Por favor no comparta estos datos:

      User: ${email}
      Password: ${password}
      
      Este es un mail autogenerado, por favor no contestar.`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};