import { UpdateUserDto } from "../dtos/user";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {

  abstract update(updateUserDto: UpdateUserDto, id:string): Promise<UserEntity>;
  
  abstract findById(id: string): Promise<UserEntity>;

  abstract uploadImageProfile(phone: string, image:string): Promise<string>;

  abstract updateImageProfile(phone: string, image:string): Promise<string>;
  
}