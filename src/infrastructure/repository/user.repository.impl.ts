import { UserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto, UpdateUserDto } from "../../domain/dtos/user";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";


export class UserRepositoryImpl implements UserRepository {

  constructor(private readonly datasource: UserDatasource){}
  
  update(updateUserDto: UpdateUserDto, id:string): Promise<UserEntity> {
    return this.datasource.update(updateUserDto, id);
  }

  findById(id: String): Promise<UserEntity> {

    return this.datasource.findById(id);
  }

}