
export class OtpData {
  constructor(
    public readonly phone: string,
    public readonly token:string,
  ) {

  }
  static generateOtp(object: { [key: string]: any }): OtpData {

    const {
      phone,
      token,

    } = object;

    return new OtpData(
      phone,
      token
    );

  }
}