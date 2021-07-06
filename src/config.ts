import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const { dbUser, dbPass, PORT: _PORT, NODE_ENV, JWT, MONGODB_URL } = process.env;

const isTesting = NODE_ENV === 'test';
const dbName = isTesting ? 'test' : 'yogini';
const dbUrl = MONGODB_URL || 'cluster0.eekxe.mongodb.net';

const connectDb = () =>
  mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbUrl}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

const PORT = isTesting ? parseInt(`${Math.random() * 10}999`, 10) : _PORT;

const authConfig = {
  jwtSecret: JWT || 's3cr370',
};

export { connectDb, PORT, NODE_ENV, authConfig };
