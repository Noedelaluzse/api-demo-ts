import { UploadedFile } from "express-fileupload";
import { UpdateUserDto } from "../dtos/user";
import { UserEntity } from "../entities/user.entity";
import { FileUploadDataService } from "../services/file-upload.service";

export abstract class UserRepository {

  abstract update(updateUserDto: UpdateUserDto, id:string): Promise<UserEntity>;
  
  abstract findById(id: string): Promise<UserEntity>;

  // abstract uploadImageProfile(phone: string, image:string): Promise<string>;
  abstract uploadImageProfile(phone: string, image: UploadedFile, service: FileUploadDataService): Promise<string>;

  abstract updateImageProfile(phone: string, image:string): Promise<string>;
  
}