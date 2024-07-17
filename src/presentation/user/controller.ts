import { Request, Response } from "express";
import { UserRepository } from "../../domain/repository/user.repository";
import { CustomError } from "../../domain/dtos/errors/custom.error";
import { GetUser, UpdateUser } from "../../domain/use-cases/user";
import { UpdateUserDto } from "../../domain/dtos/user";

export class UserController {

  constructor(private readonly userRepository: UserRepository){}

  public handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(error.message);
    }

    console.log(`${error}`); // Eliminar el console

    return res.status(500).json({ error: "Internal server error" });
  };

  public getUser = (req: Request, res: Response) => {
    
    const id = req.params.id;

    if (id === undefined) return res.status(400).json({error:'No ID was provided'});

    new GetUser(this.userRepository)
    .execute(id)
    .then(user => res.status(200).json(200))
    .catch(error => this.handleError(error, res));

  }

  public updateUser = (req: Request, res: Response) => {
    const id = req.params.id;

    if (id === undefined) return res.status(400).json({error:'No ID was provided'});

    const [error, updateDto] = UpdateUserDto.create({...req.body, id: id});
    
    if (error) return res.status(400).json({error});

    new UpdateUser(this.userRepository)
    .execute(updateDto!, id)
    .then(user => res.status(200).json(user))
    .catch(error => this.handleError(error, res));

  }

}