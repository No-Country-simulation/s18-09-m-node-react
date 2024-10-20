import MemoryStorage from "../../storage/memory.storage";
import { User, UserCredentialsAttributes } from "../model";
import { UserHelper } from '../helper';

export async function login(user: UserCredentialsAttributes) {
  try {
    const remainingLoginAttempts = MemoryStorage.addLoginAttempt(user.email);
    if (remainingLoginAttempts === -1) {
      throw new Error("Too many login attempts. Please try again later.");
    }

    const getUser = await User.findOne({ email: user.email }).exec();
    if (!getUser) throw new Error("Invalid credentials. Remaining login attempts: " + remainingLoginAttempts);

    const passwordMatch = UserHelper.comparePassword(
      user.password,
      getUser.password
    );
    if (!passwordMatch) throw new Error("Invalid credentials. Remaining login attempts: " + remainingLoginAttempts);

    MemoryStorage.deleteLoginAttempts(user.email);
    const token = UserHelper.generateToken(getUser);

    return { userData: { ...getUser.toJSON(), password: null }, token };
  } catch (err) {
    throw err;
  }
}