import { UserEntity } from "../entities/user.entity";
import { UpdateUserDto } from "../dtos/user";

export abstract class UserDatasource {

  abstract update(updateUserDto: UpdateUserDto, id:string): Promise<UserEntity>;
  
  abstract findById(id: string): Promise<UserEntity>;

  abstract uploadImageProfile(phone: string, image:string): Promise<string>;

  abstract updateImageProfile(phone: string, image:string): Promise<string>;
}