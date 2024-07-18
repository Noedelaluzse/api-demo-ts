import { PlaceRepository } from "../../repository/place.repository";

interface CreateCategoryPlaceUseCase {
  execute: (name: string) => Promise<string>;
}


export class CreateCategory implements CreateCategoryPlaceUseCase {
  constructor (
    private readonly repository: PlaceRepository
  ) {}
  execute(name: string): Promise<string> {
    return this.repository.createCategory(name);
  }


}