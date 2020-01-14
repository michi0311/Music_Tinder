import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Import all Components, which should get routed
import { CommonModule } from '@angular/common';
import { SongListComponent } from "./profile/music/song-list/song-list.component";
import { SongSearchComponent } from "./profile/music/song-search/song-search.component";
import {MusicServiceService} from "./profile/music/music-service.service";



const routes: Routes = [
  //TODO Albin: Redirecting Default to Login, when not logged in - else Startscreen or Matching Screen
  { path: '', redirectTo: '/song-list', pathMatch: 'full' },
  { path: 'song-list', component: SongListComponent },
  { path: 'song-search', component: SongSearchComponent },
  //TODO Kathi: Add Routes für Swiping and Matching Screen, or Chatting or other
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
