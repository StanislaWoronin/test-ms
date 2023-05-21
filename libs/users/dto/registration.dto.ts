import { IUser } from '../user-interface';

export type RegistrationDto = Pick<IUser, 'login' | 'email' | 'password'>;
