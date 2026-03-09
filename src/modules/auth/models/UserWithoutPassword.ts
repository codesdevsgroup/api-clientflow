import { User } from '../../../entities/user.entity';

export type UserWithoutPassword = Omit<User, 'password'>;
