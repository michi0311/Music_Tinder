import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {CommonModule} from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {MusicServiceService} from '../music-service.service';
// tslint:disable-next-line:import-spacing
import {Song} from '../song';
import {log} from 'util';
import {ITunesWebApi} from '../i-tunes-web-api';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
public songs;
  constructor(private musicService: MusicServiceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getSongs();
  }

  getSongs() {
    this.musicService.getSongs()
      .subscribe(
        data => {
        console.log(data);
        this.songs = data; } ,
      err => console.error(err),
      () => console.log('done loading foods')
    );
  }

}
