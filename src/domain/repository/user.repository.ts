import { CreateUserDto, UpdateUserDto } from "../dtos/user";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {

  abstract update(updateUserDto: UpdateUserDto, id:string): Promise<UserEntity>;
  
  abstract findById(id: String): Promise<UserEntity>;
  
}