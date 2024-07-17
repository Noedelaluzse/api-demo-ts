import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { CreateUserDto } from "../dtos/user";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
  abstract register( createUserDto: CreateUserDto, type: string): Promise<UserEntity>;
  abstract login(loginUsrDto: LoginUserDto): Promise<UserEntity>;
  abstract validateUser(token: string): Promise<string>;
  abstract revalidateToken(token: string): Promise<UserEntity>;
}