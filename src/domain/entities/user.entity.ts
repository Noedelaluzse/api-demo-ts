
export class UserEntity {


  constructor(
    private readonly name: string,
    private readonly lastname: string,
    private readonly fullName: string,
    private readonly phone: string,
    private readonly gender: string,
    private readonly rol: string,
    public img: string | null,
    private readonly token?: string
  ) {};

  static fromModelToEntity(object : {[key:string]: any}, token?: string) {

    const {
      name,
      lastname,
      phone,
      gender,
      rol,
      image_url = null,
    } = object;

    const fullName = `${name} ${lastname}`;

    return new UserEntity(
      name,
      lastname,
      fullName,
      phone,
      gender,
      rol,
      image_url,
      token
    );
  }
}