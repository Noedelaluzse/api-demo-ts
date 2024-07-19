import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

import { envs } from './envs';
cloudinary.config(envs.CLOUDINARY_URL);

export class ImageServiceAdapter { 

  static async uploadImage(path: string): Promise<UploadApiResponse|null> {
    try {

      const result = await cloudinary.uploader.upload(path);
      
      return result;
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  static async deleteImage(public_id: string): Promise<boolean> {
    try {
      await cloudinary.uploader.destroy(public_id); // { result: 'ok' }
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  }
}