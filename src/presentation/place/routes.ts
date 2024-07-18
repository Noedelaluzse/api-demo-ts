import { Router } from "express";
import { PlaceDatasourceImpl } from "../../infrastructure/datasources";
import { PlaceRepositoryImpl } from "../../infrastructure/repository";
import { PlaceController } from "./controller";
import { AuthMiddleware } from "../../domain/middlewares/auth.middlewares";


export class PlaceRoutes {

  static get routes(): Router {

    const router = Router();
    
    const datasource = new PlaceDatasourceImpl();
    const placeRepository = new PlaceRepositoryImpl(datasource);
    const placeController = new PlaceController(placeRepository);

    router.post('/',        [AuthMiddleware.validateJwt], placeController.createPlace);
    router.post('/category',[AuthMiddleware.validateJwt], placeController.createCategory);
    router.get('/',         [AuthMiddleware.validateJwt], placeController.getAllPlaces);
    router.put('/:id',      [AuthMiddleware.validateJwt], placeController.updatePlace);
    router.get('/:id',      [AuthMiddleware.validateJwt], placeController.getPlace);
    router.delete('/:id',   [AuthMiddleware.validateJwt], placeController.deletePlace);

    return router;
  }
}