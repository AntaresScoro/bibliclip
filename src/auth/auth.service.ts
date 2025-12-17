import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { toUserResponseDto } from '../users/mapper/user.mapper';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(userToCreate: RegisterDto): Promise<{
    accessToken: string;
    user: UserResponseDto;
  }> {
    const userExist = await this.userService.findByEmail(userToCreate.email);
    if (userExist) throw new ConflictException('Email already in use !');

    const saltOrRounds = Number(
      this.configService.get<number>('BCRYPT_SALT_ROUNDS') ?? 15,
    );
    const hash = await bcrypt.hash(userToCreate.password, saltOrRounds);
    const user = { passwordHash: hash, ...userToCreate };
    const userCreated = await this.userService.create(user);
    const payload = { sub: userCreated._id, email: userCreated.email };
    const token = await this.jwtService.signAsync(payload);
    return { accessToken: token, user: toUserResponseDto(userCreated) };
  }

  async login(
    loginInfos: LoginDto,
  ): Promise<{ accessToken: string; user: UserResponseDto }> {
    const user = await this.userService.findByEmail(loginInfos.email);
    if (!user) throw new UnauthorizedException('Unauthorized access !');
    const isMatch = await bcrypt.compare(
      loginInfos.password,
      user.passwordHash,
    );
    if (!isMatch) throw new UnauthorizedException('Unauthorized access !');
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { accessToken: token, user: toUserResponseDto(user) };
  }
}
