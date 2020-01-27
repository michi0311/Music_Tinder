export class User {
  name: string;
  email: string;
  birthday: string;
  songId: number;
  text: string;
  token: string;

  constructor(name: string, email: string, birthday: string, password: string) {
    this.name = name;
    this.email = email;
    this.birthday = birthday;
   // this.password = password;
  }

  public setSong(songId: number){
    this.songId = songId;
  }

  public setText(text: string){
    this.text = text;
  }
}
