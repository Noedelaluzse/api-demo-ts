import path from 'path';
import fs from 'fs'
import { UploadedFile } from 'express-fileupload';
import { Uuid } from '../../config';
import { CustomError } from '../../domain/dtos/errors/custom.error';
import { UploadImageServiceAdapter } from '../../config/upload-image.adapter';
import { FileUploadDataService } from '../../domain/services/file-upload.service';


export class UploadImageServiceImpl implements FileUploadDataService {

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath))  {
      fs.mkdirSync(folderPath);
    }
  }

  private deleteFile(path: string) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file) => {
        fs.unlinkSync(`${path}/${file}`);
      });
    }
  }
  async uploadSingleFile(file: UploadedFile, validTypes: string[]): Promise<string> {
    
    const fileExtension = file.mimetype.split("/")[1];

    if (!validTypes.includes(fileExtension!)) throw CustomError.badRequest(`Invalid type: ${fileExtension}, valid ones ${validTypes}`);

    const destination = path.join(__dirname, "../../uploads");

    this.checkFolder(destination);

    const fileName = `${Uuid.generateUUID()}.${fileExtension}`;
    
    file.mv(`${destination}/${fileName}`);

    const cloudName = await UploadImageServiceAdapter.uploadImage(`${destination}/${fileName}`);

    if (!cloudName) {
      this.deleteFile(destination);
      throw CustomError.badRequest("There was an error uploading the image to the cloud");
    }
    this.deleteFile(destination);

    return cloudName;
    
  }
  uploadMultipleFiles(files: UploadedFile[], validTypes: string[]): Promise<string> {
    throw new Error('Method not implemented.');
  }

}