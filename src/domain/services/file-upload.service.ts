import { UploadApiResponse } from "cloudinary";
import { UploadedFile } from "express-fileupload";

export abstract class FileImageService {

  abstract uploadSingleFile(file: UploadedFile, validTypes: string[]): Promise<UploadApiResponse>
  abstract uploadMultipleFiles(files: UploadedFile[], validTypes: string[]): Promise<string>
  abstract deleteSingleFile(public_id: string): Promise<boolean>;

}