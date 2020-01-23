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
          this.currentUser = data;
          console.log("Fetched User:");
          console.log(this.currentUser);
          console.log(this.currentUser.user.name);
          console.log(this.currentUser.user.id);

          //TODO - Print Cover of Song

          document.getElementById("divText").innerHTML = this.currentUser.user.name + "<br>" + this.currentUser.user.birthday;

          this.audio = new Howl({

          //TODO - URL of current Users lieblingssong


            src: ['https://audio-ssl.itunes.apple.com/itunes-assets/Music1/v4/f1/1c/93/f11c9317-50bb-20bb-f76f-5e4289b52663/mzaf_6202006266019995023.plus.aac.p.m4a'],
          });
          //Gottes Gabe
          var self = this;

          //gets invoked, when audio ends
          this.audio.on('end', function () {
            console.log("end");
            self.changeButtonPause();
            self.isPlaying = false;


          });

          this.audio.play();
          this.changeButtonPlay();
          this.isPlaying = true;

        },
        err => console.error(err),
        () => console.log('done getting (now not random) song')
      );


  }

  private songEnd() {
    console.log("Song ended");
    this.isPlaying = false;
    this.changeButtonPause()
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
    this.isPlaying = true;
    this.audio.play();
    console.log("User called repeatSong()")
  }

  //Switching to next Song - ngOnInit-Function gets called
  hateSong(): void {
    console.log("User called hateSong()");
    this.songService.sethate(this.currentUser.user.id);
    if (this.isPlaying==false) { this.changeButtonPlay()}
    this.audio.stop();
    this.ngOnInit()
  }


  loveSong(): void {
    console.log("User called loveSong");
    this.songService.setlove(this.currentUser.user.id);
    if (this.isPlaying==false) { this.changeButtonPlay()}
    this.audio.stop();
    this.ngOnInit()
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
      header: 'Why is this song my favourite?',
      message: this.createMessage(),
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
  createMessage()  {
    //TODO - Wenn implementiert, das Kommentar hinzufügen
   //let comment= this.currentUser.comment

    let comment = "Ich verbinde mit dem Lied so viele Erinnerungen an meine Zeit als Hund!";

    return comment + "<br> <br> <strong> Songtitle: </strong>" + this.currentUser.songName +
      "<br> <strong> Genre: </strong>" +this.currentUser.genre;

  }

}
