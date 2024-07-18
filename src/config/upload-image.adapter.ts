import { v2 as cloudinary } from 'cloudinary';

import { envs } from './envs';
import { CustomError } from '../domain/dtos/errors/custom.error';

// const myCloudinary = cloudinary.v2.config(envs.CLOUDINARY_URL);
cloudinary.config(envs.CLOUDINARY_URL);

export class UploadImageServiceAdapter { 

  static async uploadImage(path: string): Promise<string|null> {
    try {

      const result = await cloudinary.uploader.upload(path);
      
      return result.secure_url;
    } catch(error) {
      console.log(error);
      return null;
    }
  }
}