import { Router } from 'express';
import { AuthDatasourceImpl } from '../../infrastructure/datasources';
import { AuthRepositoryImpl } from '../../infrastructure/repository';
import { AuthController } from './controller';
import { AuthMiddleware } from '../../domain/middlewares/auth.middlewares';


export class AuthRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const authController = new AuthController(authRepository);

    router.post('/register/:type', authController.register);
    router.post('/login', authController.login);

    router.get('/verify-profile/:type', authController.validateUser) //! TODO: Controllador para solicitar el SMS o EMAIL (sms, email)

    router.post('/validate-sms/:opt', authController.validateUser); //! TODO: Controllador para realizar la confirmación del SMS
    router.get('/validate-email/:token', authController.validateUser);
    
    router.get('/renew', [AuthMiddleware.validateJwt], authController.revalidateToken);

    return router;
  }
}