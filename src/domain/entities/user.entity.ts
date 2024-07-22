
export class UserEntity {


  constructor(
    public readonly name: string,
    public readonly lastname: string,
    public readonly fullName: string,
    public readonly phone: string,
    public readonly gender: string,
    public readonly rol: string,
    public readonly email: string,
    public img: string | null,
    public readonly token?: string
  ) {};

  static fromModelToEntity(object : {[key:string]: any}, token?: string) {

    const {
      name,
      lastname,
      phone,
      gender,
      rol,
      image_url = null,
      email
    } = object;

    const fullName = `${name} ${lastname}`;

    return new UserEntity(
      name,
      lastname,
      fullName,
      phone,
      gender,
      rol,
      email,
      image_url,
      token
    );
  }
}