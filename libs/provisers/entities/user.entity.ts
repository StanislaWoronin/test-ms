import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { randomUUID } from 'crypto';
import { IUser } from '../../users';
import { CreatedUserResponse } from '../../users/response';
import { RegistrationDto } from '../../users/dto';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id = randomUUID();

  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: string = new Date().toISOString();

  static create(userDto: RegistrationDto, passwordHash: string) {
    try {
      const _user = new User();
      Object.assign(_user, userDto);
      _user.password = passwordHash;

      return _user;
    } catch (e) {
      throw new Error(e);
    }
  }

  static toViewUser(user: User): CreatedUserResponse {
    return {
      id: user.id,
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
