import { Request, Response } from "express";

import { CustomError } from "../../domain/dtos/errors/custom.error";
import { AuthRepository } from "../../domain/repository/auth.repository";
import { CreateUserDto } from "../../domain/dtos/user";
import { Login, Register, RevalidateToken, ValidateUser } from "../../domain/use-cases/auth";
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { ValidateSms } from "../../domain/use-cases/auth/confirmSms-user";

export class AuthController {
  
  constructor(private readonly authRepository: AuthRepository) {}

  public handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({message: error.message});
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
    const type = req.params.type;
    const phone = req.query.phone as string

    if (!type) throw CustomError.badRequest('Confirmation code was not provided');
    if (!phone) throw CustomError.badRequest('Phone number was not provided');

    new ValidateUser(this.authRepository)
    .execute(type, phone)
    .then(msg => res.status(201).json({status: msg, message: `Code sent to ${phone}` }))
    .catch(error => this.handleError(error, res));
  };

  confirmCode = (req: Request, res: Response) => {
    const phone = req.body.phone;
    const code = req.body.code;

    if (!phone) throw CustomError.badRequest('Phone number was not provided');
    if (!code) throw CustomError.badRequest('Confirmation code was not provided');

    new ValidateSms(this.authRepository)
    .execute(code, `+${phone}`)
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
