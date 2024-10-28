import * as bcrypt from 'bcrypt';

import { BCRYPT_ROUNDS } from '../config/environment';
import { UserRole, UserAttributes, User } from './model';
import { validateUserData } from './validation';

export default class DTO {
  private static salt = bcrypt.genSaltSync(BCRYPT_ROUNDS);
  private constructor() { }

  public static register(data: any): { error: { message: string }; value: null; password: null } | { error: null; value: UserAttributes; password: string } {

    // provisorio para que acepte el username vacio
    data.username = data.username || (data.email && data.email.split('@')[0]);


    const validationResult = validateUserData(data);
    if (validationResult.hasError) {
      return {
        error: {
          message: validationResult.errorMessages.join(', '),
        },
        value: null,
        password: null,
      };
    }

    const { email, username, password, role } = validationResult.userData!;

    // Enviar mail de registro exitoso

    const hashPassword = bcrypt.hashSync(password, this.salt);

    return {
      error: null,
      value: {
        email,
        username,
        password: hashPassword,
        role,
        active: true,
      },
      password: password,
    };
  }

  public static login(data: any) {
    const { email, password } = data;
    if (!email || !password)
      return {
        error: {
          message: 'All fields are required: email and password.',
        },
      };

    return {
      error: null,
      value: {
        email,
        password,
      },
    };
  }

  public static update(data: any, user: any) {
    const { name, surname, email, username, password, role, active } = data;
    if ((!email && !username && !password && !role && !active) || !user._id)
      return {
        error: {
          message: 'At least one field is required: email, username, password, role and active.',
        },
      };

    //  if (password && !this.checkPassword(password))
    //    return {
    //      error: {
    //        message: "Password must be at least 8 characters long."
    //      }
    //    }

    if (role && !(role in UserRole))
      return {
        error: {
          message: role + " role, doesn't have permissions.",
        },
      };

    const response: any = {
      _id: user._id,
      updatedAt: new Date(),
    };
    if (name) response.name = name;
    if (surname) response.surname = surname;
    if (email) response.email = email;
    if (username) response.username = username;
    if (password) response.password = bcrypt.hashSync(password, this.salt);
    if (role) response.role = role;
    if (active) response.active = active;

    return {
      error: null,
      value: response,
    };
  }

  public static getByToken(user: any) {
    const { _id } = user;

    if (!_id)
      return {
        error: {
          message: 'User not found.',
        },
      };

    return {
      error: null,
      value: { _id }
    };
  }
}
