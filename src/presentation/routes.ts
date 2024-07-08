import { Router } from 'express';


export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    const path_version = '/api/v1';

    return router;
  }
}