import { IUser } from '../user-interface';

export type CreatedUserResponse = Omit<IUser, 'password'>;
