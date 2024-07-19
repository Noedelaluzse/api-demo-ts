import { UploadedFile } from "express-fileupload";
import { PlaceRepository } from "../../repository/place.repository";
import { FileImageService } from "../../services/file-upload.service";


interface UploadImagePlaceUseCase {
  execute(id:string, image: UploadedFile[]): Promise<string[]>;
}


export class UploadImagePlace implements UploadImagePlaceUseCase {
  
  constructor(
    private readonly repository: PlaceRepository,
    private readonly service:FileImageService
  ){}

  execute(id: string, images: UploadedFile[]): Promise<string[]> {
    return this.repository.uploadImagePlace(id, images, this.service);
  }

}