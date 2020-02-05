import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicServiceService} from '../music-service.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  public songs;

  constructor(
    private musicService: MusicServiceService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getSongs();
  }

  getSongs() {
    this.musicService.getSongs()
      .subscribe(
        data => {
          this.songs = data;
        },
        err => console.error(err),
        () => console.log('done loading foods')
      );
  }
}
