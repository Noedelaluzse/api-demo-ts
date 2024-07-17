
export class LoginUserDto {

  private constructor (
    public phone: string,
    public password: string
  ) {}

  static create(object: {[key:string]: any}): [string?, LoginUserDto?] {

    const { phone, password } = object;

    if (!phone) return ['Missing phone'];
    if (!password) return ['Missing password'];

    return [undefined, new LoginUserDto(phone, password)]

  }
}