import { UploadedFile } from "express-fileupload";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UpdateUserDto } from "../../domain/dtos/user";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";
import { FileUploadDataService } from "../../domain/services/file-upload.service";


export class UserRepositoryImpl implements UserRepository {

  constructor(private readonly datasource: UserDatasource){}
  
  uploadImageProfile(phone: string, image: UploadedFile,service: FileUploadDataService): Promise<string> {
    return this.datasource.uploadImageProfile(phone, image, service);
  }

  updateImageProfile(phone: string, image:string): Promise<string> {
    return this.datasource.updateImageProfile(phone, image);
  }
  
  update(updateUserDto: UpdateUserDto, id:string): Promise<UserEntity> {
    return this.datasource.update(updateUserDto, id);
  }

  findById(id: string): Promise<UserEntity> {

    return this.datasource.findById(id);
  }

}