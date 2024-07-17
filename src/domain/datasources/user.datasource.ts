import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from "../dtos/user";


export abstract class UserDatasource {

  abstract update(updateUserDto: UpdateUserDto, id:string): Promise<UserEntity>;
  
  abstract findById(id: String): Promise<UserEntity>;
  
}