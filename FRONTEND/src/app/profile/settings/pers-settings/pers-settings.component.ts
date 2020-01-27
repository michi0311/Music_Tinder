import {Component, OnInit} from '@angular/core';
import {Person} from '../../music/person';
import {MusicServiceService} from '../../music/music-service.service';
import {AuthenticationService} from '../../../authentification/services/authentication.service';
import {User} from '../../../authentification/model/user';
import {UserService} from "../../../authentification/services/user.service";
import {MessageUtil} from 'src/app/message-util';

@Component({
  selector: 'app-pers-settings',
  templateUrl: './pers-settings.component.html',
  styleUrls: ['./pers-settings.component.css']
})
export class PersSettingsComponent implements OnInit {
  person: User;

  constructor(public service: MusicServiceService, public auth: AuthenticationService, public userServ: UserService) {
    this.person = this.auth.currentUserValue;
    console.log("this is fperson");
    console.log(JSON.stringify(this.person));
  }

  ngOnInit() {
  }

  public update() {
    console.log(JSON.stringify(this.person));
    this.userServ.update(this.person)
      .subscribe(
        data => {
          console.log(data);
          MessageUtil.showMessage('update successful');
        },
        err => console.error(err),
        () => console.log('done updating')
      );
  }

}
