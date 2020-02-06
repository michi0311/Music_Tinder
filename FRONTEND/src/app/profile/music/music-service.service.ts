import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule} from "@angular/common/http";
import {Song} from './song';
import {ResultsEntity} from './i-tunes-web-api';
import {AuthenticationService} from 'src/app/authentification/services/authentication.service';
import {UserService} from 'src/app/authentification/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private userService: UserService) {
  }

  song;

  public getSongs() {
    const myHeader = this.getHeader();
    return this.http.get('http://localhost:3030/api/match/songs', JSON.parse(myHeader));
  }

  public searchSongs(term: string) {
    return this.http.get('https://itunes.apple.com/search?term=' + term + '&limit=20&media=music')
  }

  // @ts-ignore
  public addSong(song: ResultsEntity) {
    const songExport = new Song(1, song.trackName, song.artistName, song.collectionName, song.previewUrl, song.artworkUrl100, song.trackId.toString(), song.primaryGenreName, 0, 0);
    return this.http.post('http://localhost:3030/api/song/', songExport, {});
  }

  public setSong(song) {
    const url = 'http://localhost:3030/api/user';
    const myHeader = this.getHeader();
    const body = {favoriteSongid: song.song.id};
    return this.http.patch(url, body, JSON.parse(myHeader));
  }

  private getHeader() {
    const token = this.auth.getToken();
    return `{"headers" :  {"Authorization":"Bearer ${token}"}}`;
  }

  public getMatches() {
    const myHeader = this.getHeader();
    return this.http.get('http://localhost:3030/api/match/user', JSON.parse(myHeader));
  }
}
