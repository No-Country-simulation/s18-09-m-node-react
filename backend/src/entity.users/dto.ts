import * as bcrypt from 'bcrypt';

import { BCRYPT_ROUNDS } from '../config/environment';
import { UserRole, UserAttributes, User } from './model';

export default class DTO {
  private static salt = bcrypt.genSaltSync(BCRYPT_ROUNDS);
  private constructor() { }

  private static checkPassword(password: string) {
    //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //return passwordRegex.test(password);
    return password.length >= 8
  }


  public static register(data: any): { error: { message: string }, value: null } | { error: null, value: UserAttributes } {
    const { email, username, password, role } = data;

    if (!email || !username || !password) {
      return {
        error: {
          message: "All fields are required: email, username and password."
        },
        value: null
      };
    }

    if (!this.checkPassword(password)) {
      return {
        error: {
          message: "Password must be at least 8 characters long."
        },
        value: null
      };
    }
    const hashPassword = bcrypt.hashSync(password, this.salt);

    const userRole = role && (role in UserRole) ? role : UserRole.USER;

    return {
      error: null,
      value: {
        email,
        username,
        password: hashPassword,
        role: userRole,
        active: true
      }
    };
  }

  public static login(data: any) {
    const { email, password } = data;
    if (!email || !password)
      return {
        error: {
          message: "All fields are required: email and password."
        }
      }

    return {
      error: null,
      value: {
        email,
        password
      }
    }
  }


  public static update(data: any, user: any) {
    const { email, username, password, role, active } = data;
    if (!email && !username && !password && !role && !active || !user.id)
      return {
        error: {
          message: "A least one field is required: email, username, password, role and active."
        }
      }

    if (password && !this.checkPassword(password))
      return {
        error: {
          message: "Password must be at least 8 characters long."
        }
      }

    if (role && !(role in UserRole))
      return {
        error: {
          message: role + " role, doesn't have permissions."
        }
      }

    const response: any = {
      id: parseInt(user.id as string),
      updatedAt: new Date()
    };
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
    const { id } = user

    if (!id) return {
      error: {
        message: "User not found."
      }
    }

    return {
      error: null,
      value: parseInt(id as string)
    }
  }

}