import { UpdateUserDto } from "../../dtos/user";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

interface UpdateUserUseCase {
  execute(updateUserDto: UpdateUserDto,  id: string) : Promise<UserEntity>
}

export class UpdateUser implements UpdateUserUseCase {

  constructor(
    private readonly repository: UserRepository
  ){}
  
  execute(updateUserDto: UpdateUserDto, id: string): Promise<UserEntity> {
    return this.repository.update(updateUserDto, id);
  }

}