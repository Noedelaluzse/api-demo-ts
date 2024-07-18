import { v2 as cloudinary } from 'cloudinary';

import { envs } from './envs';
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