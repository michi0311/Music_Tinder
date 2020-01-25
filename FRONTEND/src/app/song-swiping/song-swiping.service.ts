import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';
import {AuthenticationService} from "../authentification/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class SongSwipingService {
  constructor(private http: HttpClient, private auth: AuthenticationService) { }
  User;

  // Fetch random user from backend
  public  getRandomUser() {
    log('call service getRandomUser');
    let myHeader = this.getHeader();
    return this.http.get('http://localhost:3030/api/user/random',JSON.parse(myHeader));
  }

  public  getSong(uid) {
    log('call service getSong');
    let myHeader = this.getHeader();
    let url = 'http://localhost:3030/api/user/song/' + uid;
    return this.http.get(url,JSON.parse(myHeader));
  }

  public setlove(uid) {
    let url= 'http://localhost:3030/api/match/' + uid;
    let myHeader = this.getHeader();
    return this.http.post(url, JSON.parse(myHeader));
  }

  public sethate(uid) {
    let url= 'http://localhost:3030/api/match/' + uid;
    let myHeader = this.getHeader();
    return this.http.delete(url, JSON.parse(myHeader));
  }

  private getHeader() {
    let token = this.auth.getToken();
    return '{"headers" :  {"Authorization":"Bearer ' + token + '"}}';
  }
}
