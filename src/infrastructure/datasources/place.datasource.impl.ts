import { PlaceModel } from "../../data/mongo";
import { PlaceDatasource } from "../../domain/datasources/place.datasource";
import { CustomError } from "../../domain/dtos/errors/custom.error";
import { CreatePlaceDto, UpdatePlaceDto } from "../../domain/dtos/place";
import { PaginationDto } from "../../domain/dtos/shared";
import { PlaceEntity } from "../../domain/entities/place.entity";



export class PlaceDatasourceImpl implements PlaceDatasource {

  async create(createPlaceDto: CreatePlaceDto): Promise<PlaceEntity> {

    const placeOnDb = await PlaceModel.findOne({
      title: createPlaceDto.title
    });

    if (placeOnDb) throw CustomError.badRequest('Place already exists');

    try {
      const newPlace = await PlaceModel.create(createPlaceDto);

      await newPlace.save();

      return PlaceEntity.fromModelToEntity(newPlace);
    } catch(error) {
      console.log(error);
      throw CustomError.internalServer('There was a problem creating the place');
    }

  }

  async update(updatePlaceDto: UpdatePlaceDto, id:string): Promise<PlaceEntity> {
    throw new Error("Method not implemented.");
  }

  async getAll(paginationDto: PaginationDto): Promise<PlaceEntity[]> {
    
    const query = {}; //! Implementar query con parametros [restaurante, bar, barato, caro, etc...]

    const arrObjPlaces = await PlaceModel.find().populate('user', 'name lastname image_url').populate('categories', 'name');

    const arrEntityPlaces = arrObjPlaces.map((objPlace) => PlaceEntity.fromModelToEntity(objPlace));

    return arrEntityPlaces;
  }

  async findById(id: string): Promise<PlaceEntity> {

    const placeOnDb = await PlaceModel.findById(id);

    if (!placeOnDb) throw CustomError.badRequest('There is no place with that id');

    return PlaceEntity.fromModelToEntity(placeOnDb);

  }
  
  async deleteById(id: string): Promise<string> {

    await this.findById(id);

    await PlaceModel.findByIdAndDelete({id: id});

    return 'The place was successfully removed '
  }

}