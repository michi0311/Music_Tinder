import { Injectable } from '@angular/core';
import { HttpHeaderResponse, HttpResponseBase, HttpClient, HttpResponse, HttpHeaders, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Song} from '../profile/music/song';
import {log} from 'util';
import {SONGS} from '../profile/music/mock-songs';
import {Observable, of} from "rxjs";
import {stringify} from "querystring";

@Injectable({
  providedIn: 'root'
})
export class SongSwipingService {
  constructor(private http: HttpClient) { }
  User;

  // Fetch random user from backend
  public  getRandomUser() {
    log('call service getRandomUser');
    let myHeader = this.getHeader();
    return this.http.get('http://localhost:3030/api/user/random',JSON.parse(myHeader));
    // dummy data
    //return of(SONGS);
  }

  private getHeader() {
    //TODO - get Token from User - now... hardcoded
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoia2FicnVnZ2VyQG91dGxvb2suY29tIiwiZXhwIjoxNTc5NDQ2MTAxLCJpYXQiOjE1Nzk0MzUzMDB9.Nqi7k_GxmCjOS6xtukhTy8Nn2ZRZ0DyjxsDMP99FAD8";
    let myHeaders = '{"headers" :  {"Authorization":"Bearer ' + token + '"}}';
    return myHeaders;
  }


}
