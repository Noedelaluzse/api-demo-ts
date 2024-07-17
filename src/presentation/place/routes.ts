import { Router } from "express";
import { PlaceDatasourceImpl } from "../../infrastructure/datasources";
import { PlaceRepositoryImpl } from "../../infrastructure/repository";
import { PlaceController } from "./controller";


export class PlaceRoutes {

  static get routes(): Router {

    const router = Router();
    
    const datasource = new PlaceDatasourceImpl();
    const placeRepository = new PlaceRepositoryImpl(datasource);
    const placeController = new PlaceController(placeRepository);

    router.post('/', placeController.createPlace);
    router.get('/', placeController.getAllPlaces);
    router.put('/:id', placeController.updatePlace);
    router.get('/:id', placeController.getPlace);
    router.delete('/:id', placeController.deletePlace);

    return router;
  }
}