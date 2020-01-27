import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {AuthenticationService} from './authentication.service';
import {log} from "util";


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  update(user) {
    const token = this.auth.getToken();
    const header = `{"headers" :  {"Authorization":"Bearer ${token}"}}`;
    log(user.id, user.email);
    return this.http.patch('http://localhost:3030/api/user', user, JSON.parse(header));
  }

  register(user) {
    return this.http.post('http://localhost:3030/api/user', user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
