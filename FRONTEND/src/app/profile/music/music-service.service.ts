import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {Song} from './song';
import {log} from 'util';
import {SONGS} from './mock-songs';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {
  constructor(private http: HttpClient) { }
   songs;

 // @ts-ignore
  public  getSongs() {
   log('call getSongs');
   // @ts-ignore
   return this.http.get('http://localhost:3030/api/song/');
   // return of(SONGS);

  }

}
