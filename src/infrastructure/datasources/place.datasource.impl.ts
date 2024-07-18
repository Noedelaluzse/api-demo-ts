import { CategoryModel, PlaceModel } from "../../data/mongo";
import { PlaceDatasource } from "../../domain/datasources/place.datasource";
import { CustomError } from "../../domain/dtos/errors/custom.error";
import { CreatePlaceDto, UpdatePlaceDto } from "../../domain/dtos/place";
import { PaginationDto } from "../../domain/dtos/shared";
import { PlaceEntity } from "../../domain/entities/place.entity";



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

}