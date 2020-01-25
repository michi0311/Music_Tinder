import {Component, OnInit, OnDestroy} from '@angular/core';
import {Howl} from 'howler';
import {SongSwipingService} from "./song-swiping.service";
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-song-swiping',
  templateUrl: './song-swiping.component.html',
  styleUrls: ['./song-swiping.component.css']
})

export class SongSwipingComponent implements OnInit, OnDestroy {
  public randomUser;
  public audio;
  public isPlaying = false;

  constructor(private songService: SongSwipingService, public toastCtrl: ToastController) {
  }

  //At start - fetch Random User and play his/her song
  ngOnInit(): void {
    this.getRandomSong();
  }

  //stop Song when switching Route
  ngOnDestroy() {
    try {
      this.audio.stop()
    } catch (e) {

    }
  }

//get random user with his/her titlesong and play it in the browser
  getRandomSong() {
    this.songService.getRandomUser()
      .subscribe(
        data => {
          this.randomUser = data;
          console.log("Fetched User: " + this.randomUser.user.name + " " + this.randomUser.user.id);

          //TODO - Print Cover of Song
          document.getElementById("divText").innerHTML = this.randomUser.user.name + "<br>" + this.randomUser.user.birthday + "<br>" + this.getAge(this.randomUser.user.birthday);

          this.audio = new Howl({
            //TODO - URL of current Users lieblingssong

            src: ['https://audio-ssl.itunes.apple.com/itunes-assets/Music1/v4/f1/1c/93/f11c9317-50bb-20bb-f76f-5e4289b52663/mzaf_6202006266019995023.plus.aac.p.m4a'],
          });

          //Gottes Gabe
          var self = this;
          //gets invoked, when audio ends
          this.audio.on('end', function () {
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


  //pauses song, when it plays, plays song when it's paused
  pausePlaySong(): void {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.changeButtonPause();
    } else {
      this.audio.play();
      this.isPlaying = true;
      this.changeButtonPlay()
    }
    console.log("User called pausePlaySong()");
    console.log(this.songService.getSong(this.randomUser.user.id))
  }

  repeatSong(): void {
    this.audio.stop();
    if (this.isPlaying == false) {
      this.changeButtonPlay()
    }
    this.isPlaying = true;
    this.audio.play();
    console.log("User called repeatSong()")
  }

  //Switching to next Song - ngOnInit-Function gets called
  hateSong(): void {
    console.log("User called hateSong()");
    this.songService.sethate(this.randomUser.user.id);
    if (this.isPlaying == false) {
      this.changeButtonPlay()
    }
    this.audio.stop();
    this.ngOnInit()
  }

  loveSong(): void {
    this.songService.setlove(this.randomUser.user.id)
      .subscribe(
        data => {
          let userMatch = data;
          console.log("User called loveSong");
          console.log(userMatch);
          console.log("This was the Result");
          this.songService.setlove(this.randomUser.user.id);
          if (this.isPlaying == false) {
            this.changeButtonPlay()
          }
          this.audio.stop();
          this.ngOnInit()
        },
        err => console.error(err),
        () => console.log('done getting love')
      );

  }

  //HTML changing methods
  changeButtonPause(): void {
    document.getElementById("Pause/Play").innerHTML = "Play";
    document.getElementById("Pause/PlayIcon").setAttribute("name", "play")
  }

  changeButtonPlay(): void {
    document.getElementById("Pause/Play").innerHTML = "Pause";
    document.getElementById("Pause/PlayIcon").setAttribute("name", "pause")
  }

  // event, that triggers the information-toast
  async openToast() {
    const toast = await this.toastCtrl.create({
      header: this.randomUser.user.name + " (" + this.getAge(this.randomUser.user.birthday) + ") : " ,
      message: this.createMessage(),
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          handler: () => {
            console.log('Closed Infotoast');
          }
        }

      ],
      color: "primary",
      position: "middle",

    });
    toast.present();
  }

  //content of the information-toast
  createMessage() {
    //TODO - Wenn implementiert, das Kommentar hinzufügen
    //let comment= this.randomUser.user.comment
    let comment = "Ich verbinde mit dem Lied so viele Erinnerungen an meine Zeit als Hund!";
    return comment + "<br> <br> <strong> Songtitle: </strong>" + this.randomUser.songName +
      "<br> <strong> Genre: </strong>" + this.randomUser.genre;
  }

  //calculate Age
  getAge(birthday) {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
