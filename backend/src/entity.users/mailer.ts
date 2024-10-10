import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_APP_PASSWORD } from '../config/environment'

const transporter = nodemailer.createTransport({
    service: 'gmail', // o utiliza otro servicio de correo SMTP
    auth: {
        user: EMAIL, // Tu dirección de correo electrónico
        pass: EMAIL_APP_PASSWORD, // La contraseña del correo o App Password si usas 2FA
    },
});

export const sendMailRegister = async (email: string, password: string) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Registro Exitoso en Break & Focus',
        text: `¡Hola!
    
    Te damos la bienvenida a Break & Focus. Tu registro ha sido exitoso, y ahora puedes disfrutar de todos nuestros servicios.
    
    A continuación, encontrarás tus datos de acceso:
    
    Usuario: ${email}
    Contraseña: ${password}

    Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
    
    ¡Gracias por unirte a Break & Focus!
    
    Atentamente,
    El equipo de Break & Focus
    
    ---
    Este es un correo autogenerado, por favor no respondas a este mensaje.`
    };
    

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info);
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};

export const sendMailForget = async (email: string, password: string) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Contraseña Restablecida - Break & Focus',
        text: `Hola,
    
    Tu contraseña ha sido restablecida exitosamente. A continuación, te proporcionamos una nueva contraseña temporal para acceder a tu cuenta en Break & Focus:
    
    Usuario: ${email}
    Contraseña temporal: ${password}
    
    Por seguridad, te recomendamos iniciar sesión de inmediato y cambiar esta contraseña por una de tu elección. Para hacerlo, ingresa a tu cuenta y dirígete a la sección de configuración.
    
    Si no solicitaste este cambio, por favor contáctanos de inmediato.
    
    Gracias por ser parte de Break & Focus.
    
    Atentamente,
    El equipo de Break & Focus
    
    ---
    Este es un correo autogenerado, por favor no respondas a este mensaje.`
    };
    

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info);
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};