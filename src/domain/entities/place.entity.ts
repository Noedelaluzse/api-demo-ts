import { UserEntity } from "./user.entity";

interface LocationEntity {
  latitude: string,
  longitude: string,
}

interface CategoryEntity {
  id: string,
  name: string
}

interface UserJoin {

  name: string,
  lastname: string,
}

export class PlaceEntity {
  constructor(
    private readonly title: string,
    private readonly short_description: string,
    private readonly location: LocationEntity,
    private readonly long_description: string,
    private readonly user: UserJoin,
    private readonly image_url: string | null,
    private readonly categories: CategoryEntity[]
  ) {}

  static fromModelToEntity(object: { [key: string]: any }) {

    const {
      title,
      short_description,
      location,
      long_description,
      id_user,
      image_url = null,
      categories
    } = object;

    const user: UserJoin = {
      name: id_user.name,
      lastname: id_user.lastname,
    };

    const arrCategories: CategoryEntity[] = categories.map((category: { [key: string]: any }) => {
      return {
        id: category._id,
        name: category.name
      };
    });

    return new PlaceEntity(
      title,
      short_description,
      location,
      long_description,
      user,
      image_url,
      arrCategories
    );
  }
}