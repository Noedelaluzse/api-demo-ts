import { UpdatePlaceDto } from "../../dtos/place";
import { PlaceEntity } from "../../entities/place.entity";
import { PlaceRepository } from "../../repository/place.repository";

interface UpdatePlaceUseCase {
  execute: (updatePlaceDto: UpdatePlaceDto, id:string) => Promise<PlaceEntity>;
}


export class UpdatePlace implements UpdatePlaceUseCase {

  constructor(
    private readonly repository: PlaceRepository
  ){}
  execute(updatePlaceDto: UpdatePlaceDto, id:string): Promise<PlaceEntity> {
    return this.repository.update(updatePlaceDto, id);

  }

}