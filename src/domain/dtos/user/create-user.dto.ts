import { ObjectId } from 'mongodb';
import { Location } from "../../interfaces";


export class CreateUserDto {

  constructor(
    public readonly name: string,
    public readonly lastname: string,
    public readonly phone: string,
    public readonly email: string,
    public password: string,
    public readonly gender: string,
    public readonly rol: string,
    public readonly status: boolean,
    public readonly wasValidated: boolean,
    public readonly image_url: string,
  ) {}

  static create(props: {[key:string]:any}): [string?, CreateUserDto?] {

    const genders = ['male', 'famale'];
    const roles = ['user', 'admin'];
    const {
      name,
      lastname,
      phone,
      email,
      password,
      gender,
      rol,
    } = props;

    if (!name) return ['Name is required', undefined];
    if (!lastname) return ['Lastname is required', undefined];
    if (!phone) return ['phone is requiresd', undefined];
    if (!password) return ['password is required', undefined];
    if (!gender) return ['Gender is required', undefined];
    if (!genders.includes(gender)) return ['Invalid Gender', undefined];
    if (!rol) return ['Rol is requiered', undefined];
    if (!roles.includes(rol)) return ['Invalid Rol', undefined];

    return [undefined, new CreateUserDto(
      name,
      lastname,
      phone,
      email,
      password,
      gender,
      rol,
      true,
      false,
      ''
    )];

  }
}