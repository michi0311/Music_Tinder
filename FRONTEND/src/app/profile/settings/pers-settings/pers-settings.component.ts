import { Component, OnInit } from '@angular/core';
import { Person } from '../../music/person';

@Component({
  selector: 'app-pers-settings',
  templateUrl: './pers-settings.component.html',
  styleUrls: ['./pers-settings.component.css']
})
export class PersSettingsComponent implements OnInit {
  person: Person
  constructor() {
    this.person = new Person("Alex", "Alex@info.com", "Alex ist der beste","alex123");
    this.person.name = "Alex";
    this.person.mail = "Alex@info.com";
    this.person.infotext = "Alex ist der beste";
    this.person.password = "alex123";
    
   }

  ngOnInit() {
  }

}
