import { UserEntity } from "../entities/user.entity";
import { UpdateUserDto } from "../dtos/user";
import { FileImageService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

export abstract class UserDatasource {

  abstract update(updateUserDto: UpdateUserDto, id:string): Promise<UserEntity>;
  
  abstract findById(id: string): Promise<UserEntity>;

  abstract uploadImageProfile(phone: string, image: UploadedFile, service: FileImageService): Promise<string>;

}