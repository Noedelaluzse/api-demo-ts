import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { UserRoutes } from './user/routes';
import { PlaceRoutes } from './place/routes';


export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    const path_version = '/api/v1';

    router.use(`${path_version}/auth`, AuthRoutes.routes);
    router.use(`${path_version}/users`, UserRoutes.routes);
    router.use(`${path_version}/places`, PlaceRoutes.routes);

    return router;
  }
}