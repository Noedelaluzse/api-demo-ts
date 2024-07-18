import { UserRepository } from "../../repository/user.repository";
import { FileUploadDataService } from "../../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

interface UploadImageProfileUseCase {
  execute(phone: string, image: UploadedFile): Promise<string>;
}

export class UploadImageProfile implements UploadImageProfileUseCase {

  constructor(private readonly repository: UserRepository, private readonly  service:FileUploadDataService) {}

  async execute(phone: string, image: UploadedFile): Promise<string> {
    const imageUri = await this.service.uploadSingleFile(image, ['png', 'jpg', 'jpeg']);

    return this.repository.uploadImageProfile(phone, imageUri);
  }

}