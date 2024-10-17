import mongoose, { Schema, Document, Model } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserAttributes {
  email: string;
  username: string;
  password: string;
  role: UserRole;
  active: boolean;
}

export interface UserCreationAttributes
  extends Omit<UserAttributes, 'active'> { }

export interface UserUpdateAttributes
  extends Partial<UserAttributes> { }

export interface UserCredentialsAttributes {
  email: string;
  password: string;
}

export interface UserDocument extends Document, UserAttributes {
  _id: string;
}

const UserSchema: Schema<UserDocument> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [UserRole.ADMIN, UserRole.USER],
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

export const User: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);
