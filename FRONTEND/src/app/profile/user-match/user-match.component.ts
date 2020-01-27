import { Component, OnInit } from '@angular/core';
import {MusicServiceService} from "../music/music-service.service";

@Component({
  selector: 'app-user-match',
  templateUrl: './user-match.component.html',
  styleUrls: ['./user-match.component.css']
})
export class UserMatchComponent implements OnInit {

  users;

  constructor(private musicService: MusicServiceService) { }

  ngOnInit() {
  }

  getSongs() {
    this.musicService.getMatches()
      .subscribe(
        data => {
          console.log(data);
          this.users = data;
        },
        err => console.error(err),
        () => console.log('done loading foods')
      );
  }

}
