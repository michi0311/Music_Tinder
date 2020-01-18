import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'FRONTEND';
  constructor() {}

public openMenu() {
    document.querySelector('#menu')
      .open();
  }

  public closeMenu() {
    document.querySelector('#menu')
      .close();
  }
}
