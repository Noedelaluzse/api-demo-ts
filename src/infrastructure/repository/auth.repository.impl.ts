import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { CreateUserDto } from "../../domain/dtos/user";
import { UserEntity } from "../../domain/entities/user.entity";
import { AuthRepository } from "../../domain/repository/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {

  constructor(private readonly datasource: AuthDatasource){}
  
  register(createUserDto: CreateUserDto, type:string): Promise<UserEntity> {
    return this.datasource.register(createUserDto, type);
  }
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.datasource.login(loginUserDto);
  }
  validateUser(token: string): Promise<string> {
    return this.datasource.validateUser(token);
  }
  revalidateToken(token: string): Promise<UserEntity> {
    return this.revalidateToken(token);
  }

}