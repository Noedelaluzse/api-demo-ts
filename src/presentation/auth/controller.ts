import { Request, Response } from "express";

import { CustomError } from "../../domain/dtos/errors/custom.error";
import { AuthRepository } from "../../domain/repository/auth.repository";
import { CreateUserDto } from "../../domain/dtos/user";
import { Login, Register, RevalidateToken, ValidateUser } from "../../domain/use-cases/auth";
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';

export class AuthController {
  
  constructor(private readonly authRepository: AuthRepository) {}

  public handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({error: error.message});
    }

    console.log(`${error}`); // Eliminar el console

    return res.status(500).json({ error: "Internal server error" });
  };

  register = (req: Request, res: Response) => {
    const arrTypes = ['email', 'phone'];

    const registrationType: string = req.params.type;

    if (!arrTypes.includes(registrationType)) return res.status(400).json({error:'Invalid type of registration'});
    
    const [error, createDto] = CreateUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new Register(this.authRepository)
      .execute(createDto!, registrationType)
      .then((user) => res.status(201).json(user))
      .catch(error => this.handleError(error, res));
  };

  login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({error});

    new Login(this.authRepository)
    .execute(loginUserDto!)
    .then(user => res.status(201).json(user))
    .catch(error => this.handleError(error, res));

  };

  validateUser = (req: Request, res: Response) => {
    const token = req.params;

    if (token) throw CustomError.badRequest('Confirmation code was not provided');

    new ValidateUser(this.authRepository)
    .execute(token!)
    .then(msg => res.status(201).json(msg))
    .catch(error => this.handleError(error, res));
  };

  revalidateToken = (req: Request, res: Response) => {
    const token = req.header('Authorization');

    if (token) throw CustomError.badRequest('No token');

    new RevalidateToken(this.authRepository)
    .execute(token!)
    .then(user => res.status(201).json(user))
    .catch(error => this.handleError(error, res));
  };
}
