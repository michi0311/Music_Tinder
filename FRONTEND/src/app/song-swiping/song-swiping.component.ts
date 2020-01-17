import {Component, OnInit, Input, Output} from '@angular/core';
import {MusicServiceService} from '../profile/music/music-service.service';
import {ActivatedRoute} from "@angular/router";
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-song-swiping',
  templateUrl: './song-swiping.component.html',
  styleUrls: ['./song-swiping.component.css']
})
export class SongSwipingComponent implements OnInit {
  public song;
  public currentSong;

  constructor(private musicService: MusicServiceService) {

  }

  ngOnInit() {
    this.currentSong = this.getRandomSong();
  }

  getRandomSong() {
    //TODO - Change from first Song of Songlist to Random Song
    this.musicService.getSongs()
      .subscribe(
        data =>{
          console.log(data);
          this.song = data[0];
          document.getElementById("divText").innerHTML = this.song.songName;

          var audio = new Howl({
            src: ['https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview62/v4/0e/36/44/0e3644c8-fc1e-9a80-e1df-05476d5d02f4/mzaf_552550923465582745.plus.aac.p.m4a']
          });

          audio.play();
        },
        err => console.error(err),
        () => console.log('done loading foods')
      );

  }


  repeatSong(): void {
    alert("You repeat the Song (not working)")
  }

  hateSong(): void {
    alert("You hate the Song (not working)")
  }

  saveSong(): void {
    alert("You saved the Song (not working)")
  }

  loveSong(): void {
    alert("You love the Song (not working)")
  }

  infoSong(): void {
    alert("You get more informations about the Song (not working)")
  }

}
