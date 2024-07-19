import { UploadedFile } from "express-fileupload";
import { CategoryModel, PlaceModel } from "../../data/mongo";
import { PlaceDatasource } from "../../domain/datasources/place.datasource";
import { CustomError } from "../../domain/dtos/errors/custom.error";
import { CreatePlaceDto, UpdatePlaceDto } from "../../domain/dtos/place";
import { PaginationDto } from "../../domain/dtos/shared";
import { PlaceEntity } from "../../domain/entities/place.entity";
import { FileImageService } from "../../domain/services/file-upload.service";



export class PlaceDatasourceImpl implements PlaceDatasource {

  async createCategory(name: string): Promise<string> {

    const value = name.toLowerCase();

    const categoryOnDb = await CategoryModel.findOne({
      name: value
    });

    if (categoryOnDb) throw CustomError.badRequest('Category already exists');

    const newCategory = await CategoryModel.create({
      name: name
    });

    await newCategory.save();

    return Promise.resolve('Category created successfully');
  }

  async create(createPlaceDto: CreatePlaceDto): Promise<PlaceEntity> {

    const placeOnDb = await PlaceModel.findOne({
      title: createPlaceDto.title
    });

    if (placeOnDb) throw CustomError.badRequest('Place already exists');

    try {
      const newPlace = await PlaceModel.create(createPlaceDto);

      await newPlace.save();

      const currenPlace = await PlaceModel.findOne({
        title: createPlaceDto.title
      }).populate('id_user', 'name lastname image_url').populate('categories', 'name');

      if (!currenPlace) throw CustomError.badRequest('Place not found');
      
      return PlaceEntity.fromModelToEntity(currenPlace);

    } catch(error) {
      console.log(error);
      const customError = error as CustomError;
      throw CustomError.internalServer(customError.message);
    }

  }

  async update(updatePlaceDto: UpdatePlaceDto, id:string): Promise<PlaceEntity> {
    await this.findById(id);

    try {
      const updatedPlace = await PlaceModel.findOneAndUpdate(
        {_id: id}, 
        updatePlaceDto, 
        {new: true}).populate('id_user', 'name lastname image_url').populate('categories', 'name');
      
      if (!updatedPlace) throw CustomError.badRequest('Place not found');

      return PlaceEntity.fromModelToEntity(updatedPlace);
    } catch(error) {
      console.log(error);
      const customError = error as CustomError;
      throw CustomError.internalServer(customError.message);
    }
  }

  async getAll(paginationDto: PaginationDto): Promise<PlaceEntity[]> {
    
    const query = {}; //! Implementar query con parametros [restaurante, bar, barato, caro, etc...]

    // obtener solo name, lastname, image_url
    const arrObjPlaces = await PlaceModel.find().populate('id_user', 'name lastname image_url').populate('categories', 'name');

    const arrEntityPlaces = arrObjPlaces.map((objPlace) => PlaceEntity.fromModelToEntity(objPlace));

    return arrEntityPlaces;
  }

  async findById(id: string): Promise<PlaceEntity> {

    const placeOnDb = await PlaceModel.findById(id).populate('id_user', 'name lastname image_url').populate('categories', 'name');

    if (!placeOnDb) throw CustomError.badRequest('There is no place with that id');

    return PlaceEntity.fromModelToEntity(placeOnDb);

  }
  
  async deleteById(id: string): Promise<string> {

    await this.findById(id);

    await PlaceModel.findByIdAndDelete({_id: id});

    return 'The place was successfully removed '
  }
  
  async uploadImagePlace(id: string, images: UploadedFile[], service: FileImageService): Promise<string[]> {

    const placeOnDb = await PlaceModel.findById({_id:id});

    if (!placeOnDb) throw CustomError.badRequest('User not found');

    if (placeOnDb.image_url.length > 0) {

      for (const url of placeOnDb.image_url) {
        const arrName = url.split('/');
        const image_name = arrName.pop();
        const public_id = image_name?.split('.').shift();

        const res = await service.deleteSingleFile(public_id!);
        if (!res) throw CustomError.badRequest('there was an error deleting the photo')
      }
    }

    const cloudImage = await service.uploadMultipleFiles(images, ['png', 'jpg', 'jpeg']);

    if (!cloudImage) throw CustomError.badRequest('there was an error uploading the photo');

    const arrURL = cloudImage;

    placeOnDb.image_url = arrURL;

    placeOnDb.save();

    const placeEntity = PlaceEntity.fromModelToEntity(placeOnDb);  

    return arrURL;
  }
}