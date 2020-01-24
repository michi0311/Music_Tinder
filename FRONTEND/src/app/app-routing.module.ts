import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./authentification/login/login.component";
import {RegisterComponent} from "./authentification/register/register.component";
import {AuthGuard} from "./authentification/helpers/auth.guard";

// Import all Components, which should get routed
import {SongListComponent} from './profile/music/song-list/song-list.component';
import {SongSearchComponent} from './profile/music/song-search/song-search.component';
import {SongSwipingComponent} from './song-swiping/song-swiping.component';
import {SettingsComponent} from './profile/settings/settings.component';
import { PersSettingsComponent } from './profile/settings/pers-settings/pers-settings.component';


const routes: Routes = [
  // TODO Albin: Redirecting Default to Login, when not logged in - else Startscreen or Matching Screen
  { path: '', component: SongSwipingComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  // { path: '', redirectTo: '/song-list', pathMatch: 'full' },
  {path: 'song-list', component: SongListComponent},
  {path: 'song-search', component: SongSearchComponent},
  // TODO Kathi: Add Routes für Swiping and Matching Screen, or Chatting or other
  { path: 'song-swipe', component: SongSwipingComponent},
  { path: 'settings', component: SettingsComponent},
  {path: 'pers-settings', component: PersSettingsComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
