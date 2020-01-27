import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Song} from './song';
import {log} from 'util';
import {SONGS} from './mock-songs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ITunesWebApi, ResultsEntity} from './i-tunes-web-api';
import {AuthenticationService} from 'src/app/authentification/services/authentication.service';
import {UserService} from 'src/app/authentification/services/user.service';
import {computeStackId} from '@ionic/angular/dist/directives/navigation/stack-utils';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {
  constructor(private http: HttpClient, private auth: AuthenticationService, private userService: UserService) {
  }

  song;


  public getSongs() {
    const myHeader = this.getHeader();
    return this.http.get('http://localhost:3030/api/match/songs', JSON.parse(myHeader));
  }

  public searchSongs(term: string) {
    return this.http.get('https://itunes.apple.com/search?term=' + term + '&entity=musicTrack&limit=20&attribute=songTerm');
  }

  // @ts-ignore
  public addSong(song: ResultsEntity) {
    // tslint:disable-next-line:max-line-length
    const songExport = new Song(1, song.trackName, song.artistName, song.collectionName, song.previewUrl, song.artworkUrl60, song.trackId.toString(), song.primaryGenreName, 0, 0);
    console.log(songExport);
    return this.http.post('http://localhost:3030/api/song/', songExport, {});
  }

  public setSong(song) {
    const url = 'http://localhost:3030/api/user';
    const myHeader = this.getHeader();
    console.log(song);
    const body = {favoriteSongid: song.song.id};
    console.log(body);
    return this.http.patch(url, body, JSON.parse(myHeader));
  }

  private getHeader() {
    const token = this.auth.getToken();
    return `{"headers" :  {"Authorization":"Bearer ${token}"}}`;
  }

  public getMatches() {
    const myHeader = this.getHeader();
    return this.http.get('http://localhost:3030/api/match/users', JSON.parse(myHeader));
  }


}
