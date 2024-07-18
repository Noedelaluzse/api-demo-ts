import { UserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto, UpdateUserDto } from "../../domain/dtos/user";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from '../../domain/dtos/errors/custom.error';
import { UserModel } from "../../data/mongo";


export class UserDatasourceImpl implements UserDatasource {

  async update(updateUserDto: UpdateUserDto, id: string): Promise<UserEntity> {

   try {
    await this.findById(id);

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      { new: true }
    );

    if (!updatedUser) throw CustomError.badRequest("There was a problem updating the user");

    return UserEntity.fromModelToEntity(updatedUser);

   } catch(error) {
    console.log(error);
    const customError = error as CustomError;
    throw CustomError.badRequest(customError.message);
   }
   
  }

  async findById(id: String): Promise<UserEntity> {
    
    try {
      const userOnDb = await UserModel.findById({_id: id});

      if (!userOnDb) throw CustomError.badRequest('User not found');

      return UserEntity.fromModelToEntity(userOnDb);
      
    } catch(error) {
      console.log(error);
      const customError = error as CustomError;
      throw CustomError.badRequest(customError.message);
    }
  }

}