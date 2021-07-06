import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { authConfig } from '../config';
import { UserService } from './user.service';

const userService = new UserService();

export class AuthService {
  async login(username: string, password: string) {
    const user = await userService.getByUsername(username);
    if (user && user.username != null && user.password != null) {
      if (!this.checkIfPasswordIsValid(password, user.password)) {
        throw new Error('usuário ou senhas não correspondem');
      }
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        authConfig.jwtSecret,
        { expiresIn: '90d' },
      );
      return { token, user };
    }

    throw new Error('usuário ou senhas não correspondem');
  }

  hashPassword = async (decrypted: string) => {
    const result = await bcrypt.hash(decrypted, 10);
    return result;
  };

  checkIfPasswordIsValid = (pass: string, hash: string) =>
    bcrypt.compareSync(pass, hash);
}
