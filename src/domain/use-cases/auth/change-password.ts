import { AuthRepository } from "../../repository/auth.repository";


interface ChangePassworUseCase {
  execute(newPassword: string, token: string): Promise<string>;
}


export class ChangePassword implements ChangePassworUseCase {
  constructor (
    private readonly repository: AuthRepository
  ) {

  }
  execute(newPassword: string, token: string): Promise<string> {
    return this.repository.changePassword(newPassword, token);
  }

}