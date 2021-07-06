import { Schema, model, Document } from 'mongoose';

export interface IUserModel extends Document {
  username: string;
  password: string;
  name: string;
  foto: string;
  email: string;
  telefone: string;
  sobre: string;
}

const UserSchema = new Schema<IUserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  sobre: {
    type: String,
    required: true,
  },
});

export default model<IUserModel>('User', UserSchema);
