import { UserEntity } from "./user.entity";

interface LocationEntity {
  latitude: String,
  longitude: String,
}

interface CategoryEntity {
  id: string,
  name: string
}

export class PlaceEntity {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly short_description: string,
    private readonly location: LocationEntity,
    private readonly long_description: string,
    private readonly user: UserEntity,
    private readonly image_url: string | null,
    private readonly categories: CategoryEntity[]
  ) {}

  static fromModelToEntity(object: { [key: string]: any }) {
    const {
      id,
      title,
      short_description,
      location,
      long_description,
      user,
      image_url = null,
      categories
    } = object;

    const entityUserr = UserEntity.fromModelToEntity(user);

    return new PlaceEntity(
      id,
      title,
      short_description,
      location,
      long_description,
      entityUserr,
      image_url,
      categories
    );
  }
}