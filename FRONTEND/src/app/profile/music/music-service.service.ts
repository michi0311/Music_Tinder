import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Song} from './song';
import {log} from 'util';
import {SONGS} from './mock-songs';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {
  constructor(private http: HttpClient) { }
   song;

 // @ts-ignore
  public  getSongs() {
   log('call getSongs');
   // @ts-ignore
   return this.http.get('http://localhost:3030/api/song/');
   // return of(SONGS);
  }
  public searchSongs(term: string) {
    return this.http.get('https://itunes.apple.com/search?term=' + term + '&entity=musicTrack&limit=20&attribute=songTerm');
  }
  // @ts-ignore
  public addSong(song  ) {
    const songExport = new Song(1, song.trackName, song.previewUrl, song.trackId.toString(), song.primaryGenreName, 0, 0);
    log(songExport);
    return this.http.post('http://localhost:3030/api/song/', songExport, {});
  }
}
