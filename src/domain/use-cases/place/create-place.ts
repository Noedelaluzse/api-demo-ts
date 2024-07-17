import { CreatePlaceDto } from "../../dtos/place";
import { PlaceEntity } from "../../entities/place.entity";
import { PlaceRepository } from "../../repository/place.repository";

interface CreatePlaceUseCase {
  execute: (createPlaceDto: CreatePlaceDto) => Promise<PlaceEntity>;
}


export class CreatePlace implements CreatePlaceUseCase {
  constructor (
    private readonly repository: PlaceRepository
  ) {}

  execute(createPlaceDto: CreatePlaceDto): Promise<PlaceEntity> {
    return this.repository.create(createPlaceDto);
  }

}