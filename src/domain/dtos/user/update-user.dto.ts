import { ObjectId } from 'mongodb';

export class UpdateUserDto {

  constructor(
    public readonly name: string,
    public readonly lastname: string,
    public readonly phone: string,
    public readonly gender: string,
    public readonly image_url: string,
    public readonly email: string,
  ){}

  get values() {

    const returnObj: {[key:string]: any} = {};

    if (this.name !== undefined) returnObj.name = this.name;
    if (this.lastname !== undefined) returnObj.lastname = this.lastname;
    if (this.phone !== undefined) returnObj.phone = this.phone;
    if (this.gender !== undefined) returnObj.gender = this.gender;
    if (this.image_url !== undefined) returnObj.image_url = this.image_url;

    return returnObj;
  }

  static create(props: {[key:string]:any}): [string?, UpdateUserDto?] {
    
    const {
      name,
      lastname,
      phone,
      gender,
      image_url,
      email
    } = props;


    return [undefined, new UpdateUserDto(
      name,
      lastname,
      phone,
      gender,
      image_url,
      email
    )];

  }
}