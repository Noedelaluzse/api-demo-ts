import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UpdateUserDto } from "../../domain/dtos/user";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from '../../domain/dtos/errors/custom.error';
import { UserModel } from "../../data/mongo";
import { FileUploadDataService } from "../../domain/services/file-upload.service";
import { UploadedFile } from "express-fileupload";


export class UserDatasourceImpl implements UserDatasource {
  
  async uploadImageProfile(phone: string, image: UploadedFile, service: FileUploadDataService): Promise<string> {

    const userOnDb = await UserModel.findOne({ phone });

    if (!userOnDb) throw CustomError.badRequest('User not found');

    if (userOnDb.image_url) {
      
      const arrName = userOnDb.image_url.split('/');

      const image_name = arrName.pop();
      
      const public_id = image_name?.split('.').shift();

      const res = await service.deleteSingleFile(public_id!);
      if (!res) throw CustomError.badRequest('there was an error deleting the photo')
    }

    const cloudImage = await service.uploadSingleFile(image, ['png', 'jpg', 'jpeg']);

    if (!cloudImage) throw CustomError.badRequest('there was an error uploading the photo');

    const { secure_url } = cloudImage;

    userOnDb.image_url = secure_url;

    userOnDb.save();

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