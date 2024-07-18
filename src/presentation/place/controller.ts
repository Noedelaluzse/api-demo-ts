import { Request, Response } from "express";
import { CustomError } from "../../domain/dtos/errors/custom.error";
import { PlaceRepository } from "../../domain/repository/place.repository";
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';
import { CreatePlace, DeletePlace, GetAll, GetPlace, UpdatePlace } from "../../domain/use-cases/place";
import { CreatePlaceDto, UpdatePlaceDto } from "../../domain/dtos/place";
import { CreateCategory } from "../../domain/use-cases/place/create-category-place";

export class PlaceController {

  constructor(private readonly placeRepository: PlaceRepository) {}

  public handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({message: error.message});
    }

    console.log(`${error}`); // Eliminar el console

    return res.status(500).json({ error: "Internal server error" });
  };

  public getAllPlaces = (req: Request, res: Response) => {

    const { page = 1, limit = 100} = req.query;

    const [ error, paginationDto ] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({error});

    new GetAll(this.placeRepository)
    .execute(paginationDto!)
    .then(places => res.status(200).json(places))
    .catch(error => this.handleError(error, res));


  }

  public getPlace = (req: Request, res: Response) => {

    const id = req.params.id;

    if (id === undefined) return res.status(400).json({error:'No ID was provided'});

    new GetPlace(this.placeRepository)
    .execute(id)
    .then(place => res.status(200).json(place))
    .catch(error => this.handleError(error, res));
  }

  public deletePlace = (req: Request, res: Response) => {

    const id = req.params.id;

    if (id === undefined) return res.status(400).json({error:'No ID was provided'});

    new DeletePlace(this.placeRepository)
    .execute(id)
    .then(msg => res.status(200).json({message: msg}))
    .catch(error => this.handleError(error, res));
  }

  public updatePlace = (req: Request, res: Response) => {
    const id = req.params.id;

    if (id === undefined) return res.status(400).json({error:'No ID was provided'});

    const [error, updateDto ] = UpdatePlaceDto.create(req.body);

    if (error) return res.status(400).json({error});

    new UpdatePlace(this.placeRepository)
    .execute(updateDto!, id)
    .then(place => res.status(200).json(place))
    .catch(error => this.handleError(error, res));
  }

  public createPlace = (req: Request, res: Response) => {
    const [error, createDto ] = CreatePlaceDto.create(req.body);

    if (error) return res.status(400).json({error});

    new CreatePlace(this.placeRepository)
    .execute(createDto!)
    .then(place => res.status(201).json(place))
    .catch(error => this.handleError(error, res));
  }

  public createCategory = (req: Request, res: Response) => {
    const name = req.body.name;

    if (name === undefined) return res.status(400).json({error:'No name was provided'});

    new CreateCategory(this.placeRepository)
    .execute(name)
    .then(msg => res.status(201).json({message: msg}))
    .catch(error => this.handleError(error, res));
  }

}