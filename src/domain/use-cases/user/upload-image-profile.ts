import { UserRepository } from "../../repository/user.repository";
import { FileImageService } from "../../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

interface UploadImageProfileUseCase {
  execute(phone: string, image: UploadedFile): Promise<string>;
}

export class UploadImageProfile implements UploadImageProfileUseCase {

  constructor(private readonly repository: UserRepository, private readonly  service:FileImageService) {}

  async execute(phone: string, image: UploadedFile): Promise<string> {
    return this.repository.uploadImageProfile(phone, image, this.service);
  }

}