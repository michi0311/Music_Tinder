import {Component, OnInit, Input, Output} from '@angular/core';
import {Howl, Howler} from 'howler';
import {SongSwipingService} from "./song-swiping.service";


@Component({
  selector: 'app-song-swiping',
  templateUrl: './song-swiping.component.html',
  styleUrls: ['./song-swiping.component.css']
})
export class SongSwipingComponent implements OnInit {
  public currentUser;

  public audio;
  public isPlaying = false;
  constructor(private songService: SongSwipingService) {

  }

  //TODO - Stop song when switching routes

  ngOnInit() {
    this.getRandomSong();
  }

//get random User with his/her Titlesong and play it in the browser
  getRandomSong() {
    this.songService.getRandomUser()
      .subscribe(
        data => {
          this.currentUser = data[0];
          //TODO - Print Cover of Song
          document.getElementById("divText").innerHTML = this.currentUser.songName;
          this.audio = new Howl({
            src: [this.currentUser.URL],
          });

          this.audio.play();
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
