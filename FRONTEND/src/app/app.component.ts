
import { Component } from '@angular/core';
import {IonMenu} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'FRONTEND';
  constructor() {}

public openMenu() {
    // @ts-ignore
  (document.querySelector('#menu') as HTMLIonMenuElement )
      .open();
  }

  public closeMenu() {

    (document.querySelector('#menu') as HTMLIonMenuElement)
      .close();
  }
}
