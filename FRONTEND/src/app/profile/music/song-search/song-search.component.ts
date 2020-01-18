import { Component, OnInit } from '@angular/core';
import {MusicServiceService} from '../music-service.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {ToastController} from "@ionic/angular";
import {MessageUtil} from "../../../message-util";

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {
  results;
  constructor(private musicService: MusicServiceService, private snackBar: MatSnackBar, private toastController: ToastController) { }

  ngOnInit() {
  }
  searchSongs(term: string) {
    this.musicService.searchSongs(term)
      .subscribe(
        data => {
          console.log(data);

          const res = data;
          this.results = res; } ,
        err => console.error(err),
        () => console.log('done loading foods')
      );
  }
  addSong(result) {
    this.musicService.addSong(result)
      .subscribe(
        async data => {
          MessageUtil.showMessage('set song'); } ,
        err => console.error(err),
        () => console.log('done loading foods')
      );
  }
}
