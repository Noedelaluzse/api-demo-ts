import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { SmsService } from "../../config/sms.adapter";
import { UserModel } from "../../data/mongo";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { CustomError } from "../../domain/dtos/errors/custom.error";
import { CreateUserDto } from "../../domain/dtos/user";
import { OtpData } from "../../domain/entities/opt.entity";
import { UserEntity } from "../../domain/entities/user.entity";



export class AuthDatasourceImpl implements AuthDatasource {

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
      if (status !== "approved") throw CustomError.badRequest('Invalid code');

      const noSignPhone = phone.replace("+", "");
      const userUpdate = await UserModel.findOneAndUpdate({phone: noSignPhone}, {wasValidated: true});

      if (!userUpdate) throw CustomError.badRequest('There was an error validating the user');

      const token = await JwtAdapter.generateToken({phone});
      
      return OtpData.generateOtp({token, phone});
      
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