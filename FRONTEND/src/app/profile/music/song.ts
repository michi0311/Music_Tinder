export class Song {
  id: number;
  songName: string;
  URL: string;
  iTunesID: string;
  genre: string;
  totalLikes: number;
  totalDislikes: number;

  constructor(id: number, songName: string, URL: string, iTunesID: string, genre: string, totalLikes: number, totalDislikes: number) {
    this.id = id;
    this.songName = songName;
    this.URL = URL;
    this.iTunesID = iTunesID;
    this.genre = genre;
    this.totalLikes = totalLikes;
    this.totalDislikes = totalDislikes;
  }
}
