import { UploadedFile } from "express-fileupload";

export abstract class FileUploadDataService {

  abstract uploadSingleFile(file: UploadedFile, validTypes: string[]): Promise<string>
  abstract uploadMultipleFiles(files: UploadedFile[], validTypes: string[]): Promise<string>

}