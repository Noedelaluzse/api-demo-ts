import { UploadedFile } from "express-fileupload";
import { PlaceDatasource } from "../../domain/datasources/place.datasource";
import { CreatePlaceDto, UpdatePlaceDto } from "../../domain/dtos/place";
import { PaginationDto } from "../../domain/dtos/shared";
import { PlaceEntity } from "../../domain/entities/place.entity";
import { PlaceRepository } from "../../domain/repository/place.repository";
import { FileImageService } from "../../domain/services/file-upload.service";


export class PlaceRepositoryImpl implements PlaceRepository  {

  constructor( private datasource: PlaceDatasource ){}
  uploadImagePlace(id: string, images: UploadedFile[], service: FileImageService): Promise<string[]> {
    return this.datasource.uploadImagePlace(id, images, service);
  }
  createCategory(name: string): Promise<string> {
    return this.datasource.createCategory(name);
  }

  create(createPlaceDto: CreatePlaceDto): Promise<PlaceEntity> {
    return this.datasource.create(createPlaceDto);
  }
  update(updatePlaceDto: UpdatePlaceDto, id: string): Promise<PlaceEntity> {
    return this.datasource.update(updatePlaceDto, id);
  }
  getAll(paginationDto: PaginationDto): Promise<PlaceEntity[]> {
    return this.datasource.getAll(paginationDto);
  }
  findById(id: string): Promise<PlaceEntity> {
    return this.datasource.findById(id);
  }
  deleteById(id: string): Promise<string> {
    return this.datasource.deleteById(id);
  }

}