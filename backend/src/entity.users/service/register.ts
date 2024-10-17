import { User, UserDocument, UserAttributes } from '../model';
import { sendMailRegister } from '../mailer'


export async function register(user: UserAttributes, password: string): Promise<UserDocument> {
  try {
    const existingUsers = await User.find({
      $or: [
        { email: user.email },
        { username: user.username }
      ]
    }).exec();
    if (existingUsers.length > 0) throw new Error("User already exists.");

    const newUser = new User(user);
    const registeredUser = await newUser.save();


    if (!registeredUser) throw new Error("Unable to register user.");
    if (registeredUser) {
      await sendMailRegister(registeredUser.email, password)
    }

    return registeredUser;
  } catch (err) {
    throw err;
  }
}

