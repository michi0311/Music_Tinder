// Modules from angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {IonicModule} from '@ionic/angular';
import {MatButtonModule} from '@angular/material/button';
// Components
import {SongListComponent} from './profile/music/song-list/song-list.component';
import {SongSearchComponent} from './profile/music/song-search/song-search.component';
import {AppComponent} from './app.component';
// Models
import {AppRoutingModule} from './app-routing.module';
import {SongSwipingComponent} from './song-swiping/song-swiping.component';
import {SettingsComponent} from './profile/settings/settings.component';
import { PersSettingsComponent } from './profile/settings/pers-settings/pers-settings.component';

import {LoginComponent} from './authentification/login/login.component';
import {RegisterComponent} from './authentification/register/register.component';
import {AlertComponent} from './authentification/alert/alert.component';

import {JwtInterceptor} from './authentification/helpers/jwt.interceptor';
import {ErrorInterceptor} from "./authentification/helpers/error.interceptor";
import { UserMatchComponent } from './profile/user-match/user-match.component';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongSearchComponent,
    SongSwipingComponent,
    SettingsComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    PersSettingsComponent,
    UserMatchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    IonicModule,
    MatSnackBarModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
