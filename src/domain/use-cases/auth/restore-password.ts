import { AuthRepository } from "../../repository/auth.repository";

interface RestorePasswordUseCase {
  execute(email: string): Promise<string>
}

export class RestorePassword implements RestorePasswordUseCase {

  constructor(private readonly repository: AuthRepository) {}

  execute(email: string): Promise<string> {
    return this.repository.restorePassword(email);
  }

}