import { Location } from "../../interfaces";

export class CreatePlaceDto {
  constructor(
    public readonly title: string,
    public readonly short_description: string,
    public readonly location: Location,
    public readonly long_description: string,
    public readonly id_user: string,
    public readonly createdAt: Date,
    public readonly image_url: string[] = [],
    public readonly categories: string[] = []
  ) {}

  static create(props: { [key: string]: any }): [string?, CreatePlaceDto?] {
    const {
      title,
      short_description,
      location,
      long_description,
      id_user,
      categories,
    } = props;

    if (!title) return ['Title is required', undefined];
    if (!short_description) return ['Short Description is required', undefined];
    if (!location) return ['Location is required', undefined];
    if (!long_description) return ['Long description is required', undefined];
    if (!id_user) return ['Id User is required', undefined];
    if (!Array.isArray(categories) || categories.length === 0) return ['At least one category is required', undefined];

    const createdAt = new Date();

    return [undefined, new CreatePlaceDto(
      title,
      short_description,
      location,
      long_description,
      id_user,
      createdAt,
      [],
      categories
    )];
  }
}
