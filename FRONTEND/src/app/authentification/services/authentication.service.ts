﻿import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../model/user';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email, password) {
    return this.http.post<any>('http://localhost:3030/api/login', {email, password})
      .pipe(map((user: User) => {
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getToken() {
    return this.currentUserValue.token;
  }

  public get isLoggedIn(): boolean {
    return (this.getToken() !== null);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  setFavoriteSongidLocaleStorage(songid) {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    user.favoriteSongid = songid;
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.currentUserSubject.next(user)
  }

  setSongDescriptionLocaleStorage(descr) {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    user.songDescription = descr;
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.currentUserSubject.next(user)
  }
}
