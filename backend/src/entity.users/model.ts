import mongoose, { Schema, Document, Model, Types } from 'mongoose';

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
  // alarm: string;
  // background_color: boolean;
  // background: string;
  // techniques: Types.ObjectId[];
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
  // alarm: {
  //   type: String,
  //   default: 'Birds'
  // },
  // background_color: {
  //   type: Boolean,
  //   default: true
  // },
  // background: {
  //   type: String,
  //   default: '#000000'
  // },
  // techniques: {
  //   type: [Schema.Types.ObjectId],
  //   ref: 'PersonalTechnique',
  //   default: []
  // }
}, { timestamps: true });

export const User: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);
