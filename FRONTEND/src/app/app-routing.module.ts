import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Import all Components, which should get routed
import { SongListComponent } from "./profile/music/song-list/song-list.component";
import { SongSearchComponent } from "./profile/music/song-search/song-search.component";
import {SongSwipingComponent} from "./song-swiping/song-swiping.component";


const routes: Routes = [
  //TODO Albin: Redirecting Default to Login, when not logged in - else Startscreen or Matching Screen
  { path: '', redirectTo: '/song-list', pathMatch: 'full' },
  { path: 'song-list', component: SongListComponent },
  { path: 'song-search', component: SongSearchComponent },
  //TODO Kathi: Add Routes für Swiping and Matching Screen, or Chatting or other
  { path: 'song-swipe', component: SongSwipingComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
