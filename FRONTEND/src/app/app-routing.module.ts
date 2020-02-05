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
import {PersSettingsComponent} from './profile/settings/pers-settings/pers-settings.component';
import {UserMatchComponent} from './profile/user-match/user-match.component';


const routes: Routes = [
  {path: '', component: SongSwipingComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'matches', component: UserMatchComponent, canActivate: [AuthGuard]},

  {path: 'song-list', component: SongListComponent, canActivate: [AuthGuard]},
  {path: 'song-search', component: SongSearchComponent, canActivate: [AuthGuard]},
  {path: 'song-swipe', component: SongSwipingComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'pers-settings', component: PersSettingsComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
