import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { CreateUserDto } from "../dtos/user";
import { OtpData } from "../entities/opt.entity";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
  abstract register( createUserDto: CreateUserDto, type: string): Promise<UserEntity>;
  abstract login(loginUsrDto: LoginUserDto): Promise<UserEntity>;
  abstract verifyUser(type: string, phone:string): Promise<string>;
  abstract validateSMS(code: string, phone:string): Promise<OtpData>
  abstract validateEmail(code: string, email:string): Promise<OtpData>
  abstract revalidateToken(token: string): Promise<UserEntity>;
}