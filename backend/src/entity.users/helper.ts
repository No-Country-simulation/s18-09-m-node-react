import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserDocument } from './model';


export class UserHelper {
  private constructor() { }

  public static comparePassword(password: string, savedPassword: string) {
    return bcrypt.compareSync(password, savedPassword);
  }

  public static generateToken(user: UserDocument) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    return token;
  }


}