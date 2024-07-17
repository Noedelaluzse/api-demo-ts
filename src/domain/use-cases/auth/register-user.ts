import { CreateUserDto } from "../../dtos/user";
import { UserEntity } from "../../entities/user.entity";
import { AuthRepository } from "../../repository/auth.repository";

interface RegisterUserUseCase {
  execute( createUserDto: CreateUserDto, type: string): Promise<UserEntity>;
}

export class Register implements RegisterUserUseCase {
  constructor(private readonly repository: AuthRepository){}

  execute(createUserDto: CreateUserDto, type: string): Promise<UserEntity> {
    return this.repository.register(createUserDto, type, );
  }

}