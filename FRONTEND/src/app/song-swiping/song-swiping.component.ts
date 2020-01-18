import {Component, OnInit, Input, Output} from '@angular/core';
import {Howl, Howler} from 'howler';
import {SongSwipingService} from "./song-swiping.service";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-song-swiping',
  templateUrl: './song-swiping.component.html',
  styleUrls: ['./song-swiping.component.css']
})
export class SongSwipingComponent implements OnInit {
  public currentUser;
  public audio;
  public isPlaying = false;
  constructor(private songService: SongSwipingService, public toastCtrl: ToastController) {

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
    if (this.isPlaying==false) { this.changeButtonPlay()}
    this.audio.play();
    console.log("User called repeatSong()")
  }

  //Switching to next Song - ngOnInit-Function gets called
  hateSong(): void {
    console.log("User called hateSong()");
    if (this.isPlaying==false) { this.changeButtonPlay()}
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

  async openToast() {
    const toast = await this.toastCtrl.create({
      header: 'Warum ist es mein Lieblingssong?',
      message: 'Ich habe dieses Lied bei meiner ersten Hochzeit gehört, seitdem erinnert es mich immer an die schöne Zeit, als ich mich endlich scheiden ließ! <3',
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          handler: () => {
            console.log('Closed Infotoast');
          }}

          ],
      color: "primary",
      position: "middle",

    });
    toast.present();
  }
}
