import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { EmailAdapter } from "../../config/email.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { SmsService } from "../../config/sms.adapter";
import { UserModel } from "../../data/mongo";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { CustomError } from "../../domain/dtos/errors/custom.error";
import { CreateUserDto } from "../../domain/dtos/user";
import { OtpData } from "../../domain/entities/opt.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { Utils } from "../utils/Utils";



export class AuthDatasourceImpl implements AuthDatasource {
  
  async restorePassword(email: string): Promise<string> {
    
    const userOnDb = await UserModel.findOne({
      email: email
    });

    if (!userOnDb) throw CustomError.badRequest('No user founded');

    const userEntity = UserEntity.fromModelToEntity(userOnDb);

    const emailadapter = new EmailAdapter();

    const htmlTemplate = Utils.getTemplate('restore-password.html');

    const year = new Date().getFullYear();

    const token = await JwtAdapter.generateToken({phone: userEntity.phone});

    const obj = {
      fullname: userEntity.fullName,
      year: year.toString(),
      url: `http://localhost:3000/auth/change-password/${token}`,
      companyname: "Noe de la luz"
    };

    const html = Utils.replaceParams(htmlTemplate, obj);

    try {
      await emailadapter.sendEmail({
        to: userEntity.email,
        subject: "Restore Password",
        text: "Un correo de prueba",
        html: html
      });
  
      return 'If your email is correct, a message will be sent';
  
    } catch(error) {
      console.log(error);
      const customError = error as CustomError;
      throw CustomError.internalServer(customError.message);
    }

  } 

  changePassword(newPassword: string, token: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async verifyUser(type: string, phone:string): Promise<string> {

    // Encontrar el usuario en la base de datos con el numero de celular: phone y wasVerify en false;

    const userOnDb = await UserModel.findOne({
      phone,
      wasValidated: false
    });
    

    if (!userOnDb) throw CustomError.badRequest('There is no user with that phone number');
    
    try {
      let status:string = ""

      if (type == "sms") {
        status = await SmsService.sendVerificationSMS(`+${phone}`);
      } else {
        //! Implementar servicio de mensajeria
      }
      
      return status;

    } catch(error) {
      console.log(error);
      const customError = error as CustomError;
      throw CustomError.internalServer(customError.message);
    }
    
  }

  async validateSMS(code: string, phone:string): Promise<OtpData> {

    try {
      const status = await SmsService.verifySMS(`+${phone}`, code);
      if (status !== "approved") throw CustomError.badRequest('Invalid code provided');

      const userUpdate = await UserModel.findOneAndUpdate({phone: phone}, {wasValidated: true});

      if (!userUpdate) throw CustomError.badRequest('There was an error validating the user');

      const token = await JwtAdapter.generateToken({phone});
      
      return OtpData.generateOtp({token, phone, status});
      
    } catch(error) {
      console.log(error);
      const customError = error as CustomError;
      throw CustomError.internalServer(customError.message);
    }

  }

  async validateEmail(code: string, email:string): Promise<OtpData> {
    throw new Error("Method validateEmail not implemented.");
  }

  async revalidateToken(token: string): Promise<UserEntity> {
    throw new Error("Method revalidateToken not implemented.");
  }

  async register(createUserDto: CreateUserDto, type:string ): Promise<UserEntity> {
    
    const value = type === "email" ? createUserDto.email : createUserDto.phone;

    const userOnDb = await UserModel.findOne({
      [type]: value
    });

    if (userOnDb) throw CustomError.badRequest('User already exists');

    try {
      const hashedPassword = bcryptAdapter.hash(createUserDto.password);
      createUserDto.password = hashedPassword;
      const newUser = await UserModel.create(createUserDto);
      await newUser.save();

      return UserEntity.fromModelToEntity(newUser);
    
    } catch(error) {
      console.log(error);
      const customError = error as CustomError;
      throw CustomError.internalServer(customError.message);
    }
  }
  
  async login(loginUsrDto: LoginUserDto): Promise<UserEntity> {
    
    try {
      
      const userOnDb = await UserModel.findOne({
        phone: loginUsrDto.phone,
      });


      if (!userOnDb) throw CustomError.badRequest('Incorrect credentials');

      if (!userOnDb.wasValidated) throw CustomError.badRequest('The user is not validated');

      const isMatching = bcryptAdapter.compare(loginUsrDto.password, userOnDb.password);

      if (!isMatching) throw CustomError.badRequest('Incorrect credentials');

      const token = await JwtAdapter.generateToken({phone: userOnDb.phone});

      return UserEntity.fromModelToEntity(userOnDb, token);

    } catch(error) {
      console.log(error);
      const customError = error as CustomError;
      throw CustomError.internalServer(customError.message);
    }

  }

}