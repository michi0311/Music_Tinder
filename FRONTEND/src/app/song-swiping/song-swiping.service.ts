import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class SongSwipingService {
  constructor(private http: HttpClient) { }
  User;

  // Fetch random user from backend
  public  getRandomUser() {
    log('call service getRandomUser');
    let myHeader = SongSwipingService.getHeader();
    return this.http.get('http://localhost:3030/api/user/random',JSON.parse(myHeader));
    // dummy data
    //return of(SONGS);
  }
  public  getSong(uid) {
    log('call service getSong');
    let myHeader = SongSwipingService.getHeader();
    let url = 'http://localhost:3030/api/user/song/' + uid;
    return this.http.get(url,JSON.parse(myHeader));
    // dummy data
    //return of(SONGS);
  }
  public setlove(uid) {
    let url= 'http://localhost:3030/api/match/' + uid;
    let myHeader = SongSwipingService.getHeader();
    return this.http.post(url, JSON.parse(myHeader));
  }
  public sethate(uid) {
    let url= 'http://localhost:3030/api/match/' + uid;
    let myHeader = SongSwipingService.getHeader();
    return this.http.delete(url, JSON.parse(myHeader));
  }

  private static getHeader() {
    //TODO - get Token from User - now... hardcoded
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoia2FicnVnZ2VyQG91dGxvb2suY29tIiwiZXhwIjoxNTc5ODY2MDQ5LCJpYXQiOjE1Nzk4NTUyNDl9.Ezc-tAUgQcfSKBT43xMGfr5DRryBueltO2gL6ukti44";
    return '{"headers" :  {"Authorization":"Bearer ' + token + '"}}';
  }




}
