import { UserEntity } from "../../entities/user.entity";
import { AuthRepository } from "../../repository/auth.repository";

interface RevalidateUseCase {
  execute(token: string): Promise<UserEntity>;
}


export class RevalidateToken implements RevalidateUseCase {
  constructor(private readonly repository: AuthRepository){}

  execute(token: string): Promise<UserEntity> {
    return this.repository.revalidateToken(token);
  }

}