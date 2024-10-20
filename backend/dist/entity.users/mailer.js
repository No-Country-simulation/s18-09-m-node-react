"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailForget = exports.sendMailRegister = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const environment_1 = require("../config/environment");
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // o utiliza otro servicio de correo SMTP
    auth: {
        user: environment_1.EMAIL, // Tu dirección de correo electrónico
        pass: environment_1.EMAIL_APP_PASSWORD, // La contraseña del correo o App Password si usas 2FA
    },
});
const sendMailRegister = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: environment_1.EMAIL,
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
        const info = yield transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info);
    }
    catch (error) {
        console.error('Error al enviar correo:', error);
    }
});
exports.sendMailRegister = sendMailRegister;
const sendMailForget = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: environment_1.EMAIL,
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
        const info = yield transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info);
    }
    catch (error) {
        console.error('Error al enviar correo:', error);
    }
});
exports.sendMailForget = sendMailForget;
