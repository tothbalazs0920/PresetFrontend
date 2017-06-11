export class User {
  email: string;
  user_id: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  nickname: string;
  presetsIds: string[];

  constructor(
    email: string,
    user_id: string,
    name: string,
    picture: string,
    given_name: string,
    family_name: string,
    nickname: string
  ) {
    this.email = email;
    this.user_id = user_id;
    this.name = name;
    this.picture = picture;
    this.given_name = given_name;
    this.family_name = family_name;
    this.nickname = nickname;
  }
}