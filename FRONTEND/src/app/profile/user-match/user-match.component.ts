import {Component, OnInit} from '@angular/core';
import {MusicServiceService} from "../music/music-service.service";
import {MessageUtil} from "../../message-util";

@Component({
  selector: 'app-user-match',
  templateUrl: './user-match.component.html',
  styleUrls: ['./user-match.component.css']
})
export class UserMatchComponent implements OnInit {
  users;

  constructor(private musicService: MusicServiceService) {

    this.getMatches();
  }

  ngOnInit() {
  }

  getMatches() {
    this.musicService.getMatches()
      .subscribe(
        data => {
          this.users = data;
        },
        err => console.error(err),
        () => console.log('done loading matches')
      );
  }

  chat() {
    MessageUtil.showMessage("not implemented yet");
  }
}
