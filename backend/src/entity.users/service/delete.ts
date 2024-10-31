import { User, UserAttributes } from '../model.js';


export async function deleteUser(value: any) {
    try {
        const { _id } = value;


        const userDeleted = await User.findByIdAndDelete(_id);

        if (!userDeleted) {
            return { error: "User not found" }; // Mensaje si el usuario no existe
        }

        return { userDeleted };

    } catch (err) {
        throw err;
    }
}