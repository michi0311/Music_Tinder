import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';
import {AuthenticationService} from '../authentification/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SongSwipingService {
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService) {
  }

  User;

  // Fetch random user from backend
  public getRandomUser() {
    log('call service getRandomUser');
    let myHeader = this.getHeader();
    return this.http.get('http://localhost:3030/api/user/random', JSON.parse(myHeader));
  }

  public getSong(sid: number) {
    let url = 'http://localhost:3030/api/song/' + sid;
    return this.http.get(url);
  }

  public setlove(uid: number) {
    let url = "http://localhost:3030/api/match/" + uid;
    let myHeader = this.getHeader();
    return this.http.post(url, JSON.parse(myHeader));
  }

  public sethate(uid: number) {
    let url = "http://localhost:3030/api/match/dislike" + uid;
    let myHeader = this.getHeader();
    return this.http.post(url, JSON.parse(myHeader));
  }

  private getHeader() {
    let token = this.auth.getToken();
    return `{"headers" :  {"Authorization":"Bearer ${token}"}}`;
  }
}
