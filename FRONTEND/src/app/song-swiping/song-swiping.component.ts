import {Component, OnInit, Input, Output} from '@angular/core';
import {MusicServiceService} from '../profile/music/music-service.service';
import {ActivatedRoute} from "@angular/router";
import {Howl, Howler} from 'howler';
import {timestamp} from "rxjs/operators";
import {not} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-song-swiping',
  templateUrl: './song-swiping.component.html',
  styleUrls: ['./song-swiping.component.css']
})
export class SongSwipingComponent implements OnInit {
  public currentSong;

  public audio;
  public isPlaying = false;
  constructor(private musicService: MusicServiceService) {

  }

  ngOnInit() {
    this.getRandomSong();
  }

//get random User with his/her Titlesong and play it in the browser
  getRandomSong() {
    //TODO - Change from first Song of Songlist to Random Song
    this.musicService.getSongs()
      .subscribe(
        data => {
          this.currentSong = data[0];
          //TODO - Print Cover of Song
          document.getElementById("divText").innerHTML = this.currentSong.songName;
          //TODO get URL from Database, not hardcoded
          this.audio = new Howl({
            src: ['https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview62/v4/0e/36/44/0e3644c8-fc1e-9a80-e1df-05476d5d02f4/mzaf_552550923465582745.plus.aac.p.m4a']
          });

          this.audioId= this.audio.play();
          this.changeButtonPlay();
          this.isPlaying = true;
        },
        err => console.error(err),
        () => console.log('done getting (now not random) song')
      );

  }

  //pauses song, when it plays, plays song when it's paused
  pauseplaySong(): void {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.changeButtonPause()

      }
    else {
      this.audio.play();
      this.isPlaying = true;
      this.changeButtonPlay()
    }
    console.log("User called pause/playSong()")
  }

  repeatSong(): void {
    this.audio.stop();
    this.audio.play();
    console.log("User called repeatSong()")
  }

  //Switching to next Song - ngOnInit-Function gets called
  hateSong(): void {
    console.log("User called hateSong()");
    if (this.audio.isPlaying==false) { this.changeButtonPlay()}
    this.audio.stop();
    this.ngOnInit()
  }

  saveSong(): void {
    console.log("User called saveSong(NotWorking)")
  }

  loveSong(): void {
    console.log("User called loveSong(NotWorking)")
  }

  infoSong(): void {
    console.log("User called infoSong(NotWorking)")
  }

  changeButtonPause(): void{
    document.getElementById("Pause/Play").innerHTML = "Play";
    document.getElementById("Pause/PlayIcon").setAttribute("name", "play")
  }

  changeButtonPlay() : void {
    document.getElementById("Pause/Play").innerHTML = "Pause";
    document.getElementById("Pause/PlayIcon").setAttribute("name", "pause")
  }
}
