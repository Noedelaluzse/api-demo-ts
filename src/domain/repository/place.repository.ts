import { UploadedFile } from "express-fileupload";
import { CreatePlaceDto, UpdatePlaceDto } from "../dtos/place";
import { PaginationDto } from "../dtos/shared";
import { PlaceEntity } from "../entities/place.entity";
import { FileImageService } from "../services/file-upload.service";

export abstract class PlaceRepository {
  
  abstract create(createPlaceDto: CreatePlaceDto): Promise<PlaceEntity>;
  
  abstract update(updatePlaceDto: UpdatePlaceDto, id:string): Promise<PlaceEntity>;
  
  abstract getAll(paginationDto: PaginationDto): Promise<PlaceEntity[]>;
  
  abstract findById(id: string): Promise<PlaceEntity>;
  
  abstract deleteById(id: string): Promise<string>;

  abstract createCategory(name: string): Promise<string>;

  abstract uploadImagePlace(id: string, images: UploadedFile[], service: FileImageService): Promise<string[]>;


}