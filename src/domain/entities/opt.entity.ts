
export class OtpData {
  constructor(
    public readonly phone: string,
    public readonly token:string,
    public readonly status: string
  ) {

  }
  static generateOtp(object: { [key: string]: any }): OtpData {

    const {
      phone,
      token,
      status
    } = object;

    return new OtpData(
      phone,
      token,
      status
    );

  }
}