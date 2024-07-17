import { PlaceEntity } from "../../entities/place.entity";
import { PlaceRepository } from "../../repository/place.repository";



interface DeletePlaceUseCase {
  execute(id: string) : Promise<string>;
}

export class DeletePlace implements DeletePlaceUseCase {

  constructor(
    private readonly repository: PlaceRepository
  ){}

  execute(id: string): Promise<string> {
    return this.repository.deleteById(id);
  }
  
}