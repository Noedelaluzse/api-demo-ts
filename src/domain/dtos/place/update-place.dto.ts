import { ObjectId } from 'mongodb';
import { Location } from "../../interfaces";


export class UpdatePlaceDto {

  constructor(
    public readonly title: string,
    public readonly short_description: string,
    public readonly location: Location,
    public readonly long_description: string,
    public readonly categories: ObjectId[],

  ){}

  get values() {
     const returnObj: {[key:string]: any} = {};

     if (this.title !== undefined) returnObj.title = this.title;
     if (this.short_description !== undefined) returnObj.short_description = this.short_description;
     if (this.location !== undefined) returnObj.location = this.location;
     if (this.long_description !== undefined) returnObj.long_description = this.long_description;
     if (this.categories !== undefined) returnObj.categories = this.categories;

     return returnObj;
  }

  static create(props: {[key:string]:any}): [string?, UpdatePlaceDto?] {

    const {
      title,
      short_description,
      location,
      long_description,
      categories,
    } = props;

    const categoryIds = categories.map((id: any) =>  ObjectId.createFromHexString(id));

    return [undefined, new UpdatePlaceDto(
      title,
      short_description,
      location,
      long_description,
      categoryIds,
    )];
    
  }
}