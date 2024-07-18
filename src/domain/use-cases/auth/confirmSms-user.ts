import { OtpData } from "../../entities/opt.entity";
import { AuthRepository } from "../../repository/auth.repository";

interface ValideteSmsUseCase {
  execute(code: string, phone:string): Promise<OtpData>;
}

export class ValidateSms implements ValideteSmsUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(code: string, phone:string): Promise<OtpData> {
    return this.repository.validateSMS(code, phone);
  }
}