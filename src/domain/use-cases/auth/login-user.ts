import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { AuthRepository } from "../../repository/auth.repository";

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserEntity>
}

export class Login implements LoginUserUseCase {
  
  constructor(private readonly repository: AuthRepository){}

  execute(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.repository.login(loginUserDto);
  }

}