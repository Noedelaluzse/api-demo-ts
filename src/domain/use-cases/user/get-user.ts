import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

interface GetUserUseCase {
  execute(id: string): Promise<UserEntity>;
}


export class GetUser implements GetUserUseCase {
  
  constructor(private readonly repository: UserRepository) {}

  execute(id: string): Promise<UserEntity> {
    return this.repository.findById(id);
  }

}