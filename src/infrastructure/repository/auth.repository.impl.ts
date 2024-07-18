import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { CreateUserDto } from "../../domain/dtos/user";
import { OtpData } from "../../domain/entities/opt.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { AuthRepository } from "../../domain/repository/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {

  constructor(private readonly datasource: AuthDatasource){}

  verifyUser(type: string, id:string): Promise<string> {
    return this.datasource.verifyUser(type, id);
  }
  
  validateSMS(code: string, phone:string): Promise<OtpData> {
    return this.datasource.validateSMS(code, phone);
  }

  validateEmail(code: string,  email:string): Promise<OtpData> {
    return this.datasource.validateEmail(code, email);
  }
  
  register(createUserDto: CreateUserDto, type:string): Promise<UserEntity> {
    return this.datasource.register(createUserDto, type);
  }
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.datasource.login(loginUserDto);
  }

  revalidateToken(token: string): Promise<UserEntity> {
    return this.revalidateToken(token);
  }

}