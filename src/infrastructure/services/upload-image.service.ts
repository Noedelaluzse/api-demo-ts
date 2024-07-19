import fs from 'fs'
import { UploadedFile } from 'express-fileupload';
import { CustomError } from '../../domain/dtos/errors/custom.error';
import { ImageServiceAdapter } from '../../config/image.adapter';
import { FileImageService } from '../../domain/services/file-upload.service';
import { UploadApiResponse } from 'cloudinary';


export class UploadImageServiceImpl implements FileImageService {

  async deleteSingleFile(public_id: string): Promise<boolean> {
   const res = await ImageServiceAdapter.deleteImage(public_id);
   return res;
  }

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
  async uploadSingleFile(file: UploadedFile, validTypes: string[]): Promise<UploadApiResponse> {
    
    const fileExtension = file.mimetype.split("/")[1];

    if (!validTypes.includes(fileExtension)) throw CustomError.badRequest(`Invalid type: ${fileExtension}, valid ones ${validTypes}`);

    const { tempFilePath } = file;

    const cloudName = await ImageServiceAdapter.uploadImage(tempFilePath);

    if (!cloudName) throw CustomError.badRequest("There was an error uploading the image to the cloud");

    return cloudName;
    
  }
  uploadMultipleFiles(files: UploadedFile[], validTypes: string[]): Promise<string> {
    throw new Error('Method not implemented.');
  }

}