import {Component, OnDestroy, OnInit} from '@angular/core';
import {Howl} from 'howler';
import {SongSwipingService} from './song-swiping.service';
import {ToastController} from '@ionic/angular';
import {AuthenticationService} from "../authentification/services/authentication.service";
import {Router} from "@angular/router";
import anime from 'animejs';

@Component({
  selector: 'app-song-swiping',
  templateUrl: './song-swiping.component.html',
  styleUrls: ['./song-swiping.component.css']
})

export class SongSwipingComponent implements OnInit, OnDestroy {
  public randomUser;
  public userName = 'Name';
  public userAge = 10;
  public userId = -1;
  public randomSong;
  public songUrl: string;
  public songCover: string;
  public songArtist: string;
  public songName: string;
  public album: string;
  public songId = -1;
  public songGenre: string;
  public audio: Howl;
  public comment = 'My favourite Song';
  public isPlaying = false;
  public currentUserName = 'Music Tinder Follower';

  constructor(public songService: SongSwipingService,
              public toastCtrl: ToastController,
              public auth: AuthenticationService,
              private router: Router) {

    this.currentUserName = this.auth.currentUserValue.name;
  }

  // At start - fetch Random User and play his/her song
  ngOnInit(): void {
    // Info for first Login
    if (JSON.parse(localStorage.getItem("currentUser")).favoriteSongid == null) {
      this.openStartInfo()
    }
    this.getRandomSong();

  }

  // stop Song when switching Route
  ngOnDestroy() {
    try {
      this.audio.stop();
    } catch (e) {

    }
  }

// get random user with his/her titlesong and play it in the browser
  getRandomSong() {
    this.songService.getRandomUser()
      .subscribe(
        data => {
          this.randomUser = data;
          this.userName = this.randomUser.user.name;
          this.userAge = this.getAge(this.randomUser.user.birthday);
          this.userId = this.randomUser.user.id;
          this.songId = this.randomUser.user.favoriteSongid;
          this.comment = this.randomUser.user.songDescription;
          this.getSong();
        },
        err => console.error(err)
      );


  }

  private getSong() {
    if (this.songId === null) {
      console.log("Song is undefined");
      this.ngOnInit()
    }
    this.songService.getSong(this.songId)
      .subscribe(
        data => {
          this.randomSong = data;
          this.songUrl = this.randomSong.user.URL;
          this.songName = this.randomSong.user.songName;
          this.songCover = this.randomSong.user.artworkURL;
          this.songArtist = this.randomSong.user.artistName;
          this.songGenre = this.randomSong.user.genre;
          this.album = this.randomSong.user.collectionName;


          // let the song play
          if (this.songUrl.includes("video-ssl")) {
            console.log("Song is a Video");
            this.ngOnInit()
          }
            this.audio = new Howl({
              src: ['' + this.songUrl]
            });


            // Gottes Gabe
            const self = this;
            // gets invoked, when audio ends
            this.audio.on('end', function () {
              self.changeButtonPause();
              self.isPlaying = false;
            });

            this.audio.play();
            this.changeButtonPlay();
            this.isPlaying = true;

        },
        error => console.log(error));
  }

  // pauses song, when it plays, plays song when it's paused
  pausePlaySong(): void {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.changeButtonPause();
    } else {
      this.audio.play();
      this.isPlaying = true;
      this.changeButtonPlay();
    }
  }

  repeatSong(): void {
    this.audio.stop();
    if (this.isPlaying == false) {
      this.changeButtonPlay();
    }
    this.isPlaying = true;
    this.audio.play();
  }

  // Switching to next Song - ngOnInit-Function gets called
  hateSong() {
    this.hateAnimate();
    this.songService.sethate(this.userId)
      .subscribe(
        data => {
          const userHate = data;
        },
        err => console.error(err),
        () => console.log('done getting hate')
      );
    if (this.isPlaying === false) {
      this.changeButtonPlay();
    }
    this.audio.stop();
    this.ngOnInit();
  }

  loveSong() {
    this.loveAnimate();
    this.songService.setlove(this.userId)
      .subscribe(
        data => {
          const userMatch = data;
        },
        err => console.error(err),
        () => console.log('done getting love')
      );
    if (this.isPlaying === false) {
      this.changeButtonPlay();
    }
    this.audio.stop();
    this.ngOnInit();
  }

  // HTML changing methods
  changeButtonPause(): void {
    document.getElementById('Pause/Play').innerHTML = 'Play';
    document.getElementById('Pause/PlayIcon').setAttribute('name', 'play');
  }

  changeButtonPlay(): void {
    document.getElementById('Pause/Play').innerHTML = 'Pause';
    document.getElementById('Pause/PlayIcon').setAttribute('name', 'pause');
  }

  // event, that triggers the information-toast
  async openToast() {
    const toast = await this.toastCtrl.create({
      header: this.userName + ' (' + this.userAge + ') : ',
      message: this.getToast(),
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          handler: () => {
            console.log('Closed Infotoast');
          }
        }
      ],
      color: 'secondary',
      position: 'middle',

    });
    toast.present();
  }

  // content of the information-toast
  getToast() {
    return 'Here you could see more informations about the user. What are his oder her hobbies, living place ect. <br> ' +
      'It is also possible to read something about the song, where it is from, or another further informations' + '<br> <br> <strong> Title: </strong>' + this.songName +
      '<br> <strong> Artist: </strong>' + this.songArtist + '<br> <strong> Genre: </strong>' + this.songGenre;
  }

  // calculate Age
  getAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // show Infotext for first Login
  async openStartInfo() {
    const toast = await this.toastCtrl.create({
      header: 'Hi ' + this.currentUserName! + '!',
      message: 'Before you start, set your profile song',
      buttons: [
        {
          text: 'Set your Song',
          role: 'link',
          handler: () => {
            this.router.navigate(['/song-search'])
          }
        }
      ],
      color: 'secondary',
      position: 'middle',
    });
    toast.present();
  }

  loveAnimate() {
    anime({
      targets: '.animate-me-love',
      opacity: [
        {value: [0, 1], duration: 1000},
        {value: [1, 0], duration: 1000}
      ],
      scale: [
        {value: [2, 5], transition: 'linear', duration: 2000},
      ],
      rotate: '1turn',
      duration: 4000,
    })
  }

  hateAnimate() {
    anime({
      targets: '.animate-me-hate',
      opacity: [
        {value: [0, 1], duration: 1000},
        {value: [1, 0], duration: 1000}
      ],
      scale: [
        {value: [2, 5], transition: 'linear', duration: 2000},
      ],
      rotate: '1turn',
      duration: 4000,
    })
  }
}
