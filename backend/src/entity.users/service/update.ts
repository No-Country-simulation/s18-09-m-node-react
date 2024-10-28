import { UserUpdateAttributes, User } from '../model';

export async function update(userData: any) {
  const { _id, ...updateFields } = userData;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,                      // ID del usuario a actualizar
      { $set: updateFields },   // Campos a actualizar
      { new: true, runValidators: true }  // Opciones: `new` para devolver el documento actualizado
    );
    if (updatedUser) {
      return {
        UserUpdate: updatedUser,
      };
    } else {
      return null
    }
  } catch (err) {
    throw err;
  }
}

