import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {AuthenticationService} from './authentication.service';


@Injectable({providedIn: 'root'})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService) {
  }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  update(user) {
    let url = "http://localhost:3030/api/user";
    let myHeader = this.getHeader();
    const body = {name: user.name, email: user.email, songDescription: user.songDescription};
    return this.http.patch(url, body, JSON.parse(myHeader));
  }

  register(user) {
    return this.http.post('http://localhost:3030/api/user', user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  private getHeader() {
    let token = this.auth.getToken();
    return `{"headers" :  {"Authorization":"Bearer ${token}"}}`;
  }

}
