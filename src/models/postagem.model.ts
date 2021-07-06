import { Schema, model, Document } from 'mongoose';

export interface IPostagemModel extends Document {
  title: string;
  date: string;
  text: string;
}

export const PostagemSchema = new Schema<IPostagemModel>({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default model<IPostagemModel>('Postagem', PostagemSchema);
