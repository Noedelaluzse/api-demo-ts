import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UpdateUserDto } from "../../domain/dtos/user";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from '../../domain/dtos/errors/custom.error';
import { UserModel } from "../../data/mongo";


export class UserDatasourceImpl implements UserDatasource {
  
  async uploadImageProfile(phone: string, image:string): Promise<string> {

    const userOnDb = await UserModel.findOneAndUpdate(
      { phone },
      { image_url: image },
      { new: true }
    );

    if (!userOnDb) throw CustomError.badRequest('User not found');

    const userEntity = UserEntity.fromModelToEntity(userOnDb);  
    return userEntity.img!;
  }
  
  updateImageProfile(phone: string, image:string): Promise<string> {
    throw new Error("Method not implemented.");
  }

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

  async findById(id: string): Promise<UserEntity> {
    
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