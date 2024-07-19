import { Router } from "express";
import { PlaceDatasourceImpl } from "../../infrastructure/datasources";
import { PlaceRepositoryImpl } from "../../infrastructure/repository";
import { PlaceController } from "./controller";
import { AuthMiddleware } from "../../domain/middlewares/auth.middlewares";
import { UploadImageServiceImpl } from "../../infrastructure/services/upload-image.service";
import { FileUploadMiddleware } from "../../domain/middlewares/file-upload.midleware";


export class PlaceRoutes {

  static get routes(): Router {

    const router = Router();
    
    const datasource = new PlaceDatasourceImpl();
    const service = new UploadImageServiceImpl();

    const placeRepository = new PlaceRepositoryImpl(datasource);
    const placeController = new PlaceController(placeRepository, service);

    router.post('/upload-images', [FileUploadMiddleware.containFiles], placeController.uploadImagesPlace);
    router.post('/',        [AuthMiddleware.validateJwt], placeController.createPlace);
    router.post('/category',[AuthMiddleware.validateJwt], placeController.createCategory);
    router.get('/',         [AuthMiddleware.validateJwt], placeController.getAllPlaces);
    router.put('/:id',      [AuthMiddleware.validateJwt], placeController.updatePlace);
    router.get('/:id',      [AuthMiddleware.validateJwt], placeController.getPlace);
    router.delete('/:id',   [AuthMiddleware.validateJwt], placeController.deletePlace);

    return router;
  }
}