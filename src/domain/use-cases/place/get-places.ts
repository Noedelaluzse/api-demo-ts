import { PlaceEntity } from "../../entities/place.entity";
import { PlaceRepository } from "../../repository/place.repository";

interface GetPlaceByIdUseCase {

  execute(id: string) : Promise<PlaceEntity>;

}


export class GetPlace implements GetPlaceByIdUseCase {
  
  constructor(
    private readonly repository: PlaceRepository
  ){}
  execute(id: string): Promise<PlaceEntity> {
    return this.repository.findById(id);
  }

}