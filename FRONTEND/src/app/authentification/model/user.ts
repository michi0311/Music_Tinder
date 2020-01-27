export class User {
  name: string;
  email: string;
  birthday: string;
  favoriteSongid: number;
  songDescription: string;
  token: string;

  constructor(name: string, email: string, birthday: string, password: string) {
    this.name = name;
    this.email = email;
    this.birthday = birthday;
   // this.password = password;
  }

  public setSong(songId: number){
    this.favoriteSongid = songId;
  }

  public setText(text: string){
    this.songDescription = text;
  }
}
