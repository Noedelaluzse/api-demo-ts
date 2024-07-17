import { Router } from "express";
import { UserDatasourceImpl } from "../../infrastructure/datasources";
import { UserRepositoryImpl } from "../../infrastructure/repository";
import { UserController } from "./controller";


export class UserRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(datasource);
    const userController = new UserController(userRepository);

    router.put('/', userController.updateUser);
    router.get('/:id', userController.getUser);
    
    return router;
  }
}