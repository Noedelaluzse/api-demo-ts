import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo";
import { UserEntity } from "../entities/user.entity";

export class AuthMiddleware {

  static async validateJwt(req: Request, res: Response, next: NextFunction) {

    const authorization = req.header('Authorization');

    if (!authorization) return res.status(401).json({ message: 'No token provided' });

    if (!authorization.startsWith('Bearer')) return res.status(401).json({ message: 'Invalid token' });

    const token = authorization.split(' ')[1] || '';
    try {

      const payload = await JwtAdapter.validateToken<{phone: string}>(token);
      
      if (!payload) return res.status(401).json({ message: 'Invalid token' });
      
      const user = await UserModel.findOne({
        phone: payload.phone
      })

      if (!user) return res.status(401).json({ message: 'User not found' });

      req.body.user = UserEntity.fromModelToEntity(user);

      next();


    } catch(error) {
      console.log(error);
      res.status(500).json({error: 'Internal server error'});
    }
  }
}