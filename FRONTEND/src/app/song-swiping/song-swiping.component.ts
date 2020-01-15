import { Component, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: 'app-song-swiping',
  templateUrl: './song-swiping.component.html',
  styleUrls: ['./song-swiping.component.css']
})
export class SongSwipingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
