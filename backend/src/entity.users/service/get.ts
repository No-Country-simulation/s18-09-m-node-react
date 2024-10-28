import { User, UserAttributes } from '../model.js';


export async function get(value: any) {
  try {
    const { _id } = value;
    const user = await User.findById(_id)
    return { user }

  } catch (err) {
    throw err;
  }
}