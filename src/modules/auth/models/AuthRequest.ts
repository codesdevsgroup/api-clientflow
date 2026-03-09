import { Request } from 'express';
import { UserWithoutPassword } from './UserWithoutPassword';

export interface AuthRequest extends Request {
  user: UserWithoutPassword;
}
