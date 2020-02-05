import {Component, OnInit} from '@angular/core';
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

  constructor(
    public service: MusicServiceService,
    public auth: AuthenticationService,
    public userServ: UserService) {

    this.person = this.auth.currentUserValue;
  }

  ngOnInit() {
  }

  public update() {
    this.userServ.update(this.person)
      .subscribe(
        data => {
          if (data['user'].songDescription != null) {
            this.auth.setSongDescriptionLocaleStorage(data['user'].songDescription);
          }
          MessageUtil.showMessage('update successful');
        },
        err => console.error(err),
        () => console.log('done updating')
      );
  }
}
