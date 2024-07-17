import { PaginationDto } from "../../dtos/shared";
import { PlaceEntity } from "../../entities/place.entity";
import { PlaceRepository } from "../../repository/place.repository";

interface GetPlacesUseCase {

  execute(paginationDto: PaginationDto): Promise<PlaceEntity[]>;

}


export class GetAll implements GetPlacesUseCase {
  constructor(
    private readonly repository: PlaceRepository
  ){}
  execute(paginationDto: PaginationDto): Promise<PlaceEntity[]> {
    return this.repository.getAll(paginationDto);
  }

}