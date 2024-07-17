import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { CustomError } from "../../domain/dtos/errors/custom.error";
import { CreateUserDto } from "../../domain/dtos/user";
import { UserEntity } from "../../domain/entities/user.entity";



export class AuthDatasourceImpl implements AuthDatasource {

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

  async validateUser(token: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async revalidateToken(token: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

}