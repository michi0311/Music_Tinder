import { Component, OnInit } from '@angular/core';
import {MusicServiceService} from '../music-service.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {ToastController} from '@ionic/angular';
import {MessageUtil} from '../../../message-util';
import {ITunesWebApi} from '../i-tunes-web-api';
import { Song } from '../song';


@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {
  results: ITunesWebApi;
  constructor(private musicService: MusicServiceService, private snackBar: MatSnackBar, private toastController: ToastController) { }

  ngOnInit() {
  }
  searchSongs(term: string) {
    this.musicService.searchSongs(term)
      .subscribe(
        ( data: ITunesWebApi ) => {
          console.log(data);


          this.results = data; } ,
        err => console.error(err),
        () => console.log('done loading foods')
      );
  }
  addSong(result) {


    //first add song to DB
    this.musicService.addSong(result)
      .subscribe(
        async  (data: Song) => {
          //if ok -> set song as users profile-song
          this.musicService.setSong(data)
          .subscribe(
            async  (data) => {
              MessageUtil.showMessage('set song'); } ,
            err => console.error(err),
            () => console.log('done set song')
          );
           } ,
        err => console.error(err),
        () => console.log('done set songs')
      );
  }

 

}
