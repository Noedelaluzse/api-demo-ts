import { AuthRepository } from "../../repository/auth.repository";

interface ValidateUserUseCase {
  execute(type: string, phone:string): Promise<string>;
}


export class ValidateUser implements ValidateUserUseCase {

  constructor(private readonly repository: AuthRepository){}
  
  execute(type: string, phone:string): Promise<string> {
    return this.repository.verifyUser(type, phone);
  }

}