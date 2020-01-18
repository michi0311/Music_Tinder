import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Song} from '../profile/music/song';
import {log} from 'util';
import {SONGS} from '../profile/music/mock-songs';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongSwipingService {
  constructor(private http: HttpClient) { }
  User;

  // Fetch random user from backend
  public  getRandomUser() {
    log('call service getRandomUser');
    // Right Code, but currently not working
    //return this.http.get('http://localhost:3030/api/song/');
    // dummy data
    return of(SONGS);
  }

}
