import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern } from '@nestjs/microservices';
import { RegistrationDto } from '../../../libs/users/dto';
import { RegistrationResponse } from '../../../libs/users/response';
import * as bcrypt from 'bcrypt';
import { User } from '../../../libs/provisers/entities';
import { settings } from '../../../libs/shared';

@Controller()
export class AuthController {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private readonly jwt: JwtService,
  ) {}

  @MessagePattern({ cmd: 'register' })
  async registration(data: RegistrationDto): Promise<RegistrationResponse> {
    try {
      const salt = await bcrypt.genSalt(settings.saltRounds);
      const passwordHash = await bcrypt.hash(data.password, salt);

      const userAggregate = User.create(data, passwordHash);
      const createdUser = await this.dataSource
        .getRepository(User)
        .save(userAggregate);
      const token = await this.jwt.signAsync(
        { userId: createdUser.id },
        { expiresIn: settings.token.expiresIn },
      );
      const user = User.toViewUser(createdUser);

      return { user, token };
    } catch (e) {
      throw new Error(e);
    }
  }
}
