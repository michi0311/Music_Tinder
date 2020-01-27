export class Song {
  id: number;
  songName: string;
  artistName: string;
  collectionName: string;
  URL: string;
  artworkURL: string;
  iTunesID: string;
  genre: string;
  totalLikes: number;
  totalDislikes: number;

  constructor(id: number, songName: string, artistName: string, collectionName: string, URL: string, artworkURL: string, iTunesID: string, genre: string, totalLikes: number, totalDislikes: number) {
    this.id = id;
    this.songName = songName;
    this.artistName = artistName;
    this.collectionName = collectionName;
    this.URL = URL;
    this.artworkURL = artworkURL;
    this.iTunesID = iTunesID;
    this.genre = genre;
    this.totalLikes = totalLikes;
    this.totalDislikes = totalDislikes;
  }
}
