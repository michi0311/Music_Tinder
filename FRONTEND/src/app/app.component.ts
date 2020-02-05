import {Component} from '@angular/core';
import {AuthenticationService} from "./authentification/services/authentication.service";
import {User} from "./authentification/model/user";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONTEND';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public openMenu() {
    // @ts-ignore
    (document.querySelector('#menu') as HTMLIonMenuElement)
      .open();
  }

  public closeMenu() {
    (document.querySelector('#menu') as HTMLIonMenuElement)
      .close();
  }
}
