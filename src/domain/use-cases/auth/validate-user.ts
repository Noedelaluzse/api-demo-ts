import { AuthRepository } from "../../repository/auth.repository";

interface ValidateUserUseCase {
  execute(token: string): Promise<string>;
}


export class ValidateUser implements ValidateUserUseCase {

  constructor(private readonly repository: AuthRepository){}
  
  execute(token: string): Promise<string> {
    return this.repository.validateUser(token);
  }

}