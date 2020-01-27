import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Song} from './song';
import {log} from 'util';
import {SONGS} from './mock-songs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ITunesWebApi, ResultsEntity } from './i-tunes-web-api';
import { AuthenticationService } from 'src/app/authentification/services/authentication.service';
import { UserService } from 'src/app/authentification/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {
  constructor(private http: HttpClient, private auth: AuthenticationService, private userService: UserService) { }
   song;


  public  getSongs() {
    let myHeader = this.getHeader();
    return this.http.get('http://localhost:3030/api/user/songs',JSON.parse(myHeader));
  }
  public searchSongs(term: string) {
    return this.http.get('https://itunes.apple.com/search?term=' + term + '&entity=musicTrack&limit=20&attribute=songTerm');
  }
  // @ts-ignore
  public addSong(song: ResultsEntity ) {
    const songExport = new Song(1, song.trackName, song.artistName, song.collectionName, song.previewUrl, song.artworkUrl60, song.trackId.toString(), song.primaryGenreName, 0, 0);
    //log(songExport);
    return this.http.post('http://localhost:3030/api/song/', songExport, {});
  }

  public setSong(song: Song) {
    let user = this.auth.currentUserValue;
    user.setSong(song.id);
    return this.userService.update(user);
  }

  private getHeader() {
    let token = this.auth.getToken();
    return `{"headers" :  {"Authorization":"Bearer ${token}"}}`;
  }

  private getMatches(){
    let myHeader = this.getHeader();
    return this.http.get('http://localhost:3030/api/user/matches',JSON.parse(myHeader));
  }


}
