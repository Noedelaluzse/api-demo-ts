import { UserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto, UpdateUserDto } from "../../domain/dtos/user";
import { UserEntity } from "../../domain/entities/user.entity";


export class UserDatasourceImpl implements UserDatasource {

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  async update(updateUserDto: UpdateUserDto, id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  async findById(id: String): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

}