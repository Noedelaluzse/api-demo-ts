import { Twilio } from "twilio";
import { CustomError } from "../domain/dtos/errors/custom.error";
import { envs } from './envs';

const client = new Twilio(envs.ACCOUNTSID, envs.AUTHTOKEN);

export class SmsService {

  static async sendVerificationSMS(phone: string): Promise<string> {


    try {
      const verification = await client.verify.v2
      .services(envs.VERIFYSID)
      .verifications.create({to: phone, channel:"sms"});
  
      return verification.status;

    } catch(error) {
      console.log(error);
      const customError = error as CustomError;
      throw CustomError.badRequest(customError.message);
    }
  }

  static async verifySMS(phone: string, code:string): Promise<string> {

    try {

      const verification = await client.verify.v2
      .services(envs.VERIFYSID)
      .verificationChecks.create({to: phone, code: code});

      return verification.status;

    } catch(error) {
      console.log(error);
      const customError = error as CustomError;
      throw CustomError.badRequest(customError.message);
    }
  }
}