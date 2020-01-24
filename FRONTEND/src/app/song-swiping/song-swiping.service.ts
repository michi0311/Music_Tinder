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
  public  getSong(uid) {
    log('call service getSong');
    let myHeader = this.getHeader();
    let url = 'http://localhost:3030/api/user/song/:' + uid;
    return this.http.get(url,JSON.parse(myHeader));
    // dummy data
    //return of(SONGS);
  }
  public setlove(uid) {
    let url= 'http://localhost:3030/api/userMatch/:' + uid;
    let myHeader = this.getHeader();
    console.log(this.http.post(url, JSON.parse(myHeader)));
  }
  public sethate(uid) {
    let url= 'http://localhost:3030/api/userMatch/:' + uid;
    let myHeader = this.getHeader();
    this.http.delete(url, JSON.parse(myHeader));
  }

  private getHeader() {
    //TODO - get Token from User - now... hardcoded
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoia2FicnVnZ2VyQG91dGxvb2suY29tIiwiZXhwIjoxNTc5ODYzNDk2LCJpYXQiOjE1Nzk4NTI2OTV9.EDnOYzhSRsNooGyEasQ4x3vGiyXR4otureK0867TFnY";
    let myHeaders = '{"headers" :  {"Authorization":"Bearer ' + token + '"}}';
    return myHeaders;
  }




}
