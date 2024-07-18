import { Router } from "express";
import { UserDatasourceImpl } from "../../infrastructure/datasources";
import { UserRepositoryImpl } from "../../infrastructure/repository";
import { UserController } from "./controller";
import { AuthMiddleware } from "../../domain/middlewares/auth.middlewares";
import { UploadImageServiceImpl } from "../../infrastructure/services/upload-image.service";
import { FileUploadMiddleware } from "../../domain/middlewares/file-upload.midleware";


export class UserRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new UserDatasourceImpl();
    const service = new UploadImageServiceImpl();
    const userRepository = new UserRepositoryImpl(datasource);

    const userController = new UserController(userRepository, service);


    router.post('/upload-image', [FileUploadMiddleware.containFiles], userController.uploadImageProfile);
    router.put('/:id',   [AuthMiddleware.validateJwt], userController.updateUser);
    router.get('/:id',[AuthMiddleware.validateJwt], userController.getUser);
    
    return router;
  }
}