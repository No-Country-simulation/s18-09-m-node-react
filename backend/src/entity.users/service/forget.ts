import { User, UserAttributes } from '../model';
import { sendMailForget } from '../mailer';
import * as bcrypt from 'bcrypt';
import { BCRYPT_ROUNDS } from '../../config/environment';

export async function forgetPassword(email: string): Promise<{ success: boolean; message: string; hashPassword?: string }> {
    try {
        const existingUsers = await User.find({
            $or: [
                { email: email }
            ]
        }).exec();

        if (existingUsers.length > 0) {

            function generateRandomPassword(length: number = 8): string {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
                let password = '';
                for (let i = 0; i < length; i++) {
                    password += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return password;
            }

            const newPassword: string = generateRandomPassword(8);
            // Hashear la nueva contraseña
            const hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(BCRYPT_ROUNDS));

            // Actualizar la contraseña del usuario
            await User.findByIdAndUpdate(existingUsers[0]._id, { password: hashPassword });

            // Enviar el correo con la nueva contraseña
            await sendMailForget(email, newPassword);

            return { success: true, message: "Password reset email sent. Check email.", hashPassword };
        } else {
            return { success: false, message: "User not found.", };
        }

    } catch (err) {
        throw err;
    }
}