import { Router } from "express";
import { UserDatasourceImpl } from "../../infrastructure/datasources";
import { UserRepositoryImpl } from "../../infrastructure/repository";
import { UserController } from "./controller";
import { AuthMiddleware } from "../../domain/middlewares/auth.middlewares";


export class UserRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(datasource);
    const userController = new UserController(userRepository);

    router.put('/:id',   [AuthMiddleware.validateJwt], userController.updateUser);
    router.get('/:id',[AuthMiddleware.validateJwt], userController.getUser);
    
    return router;
  }
}