// Modules from angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import { IonicModule } from '@ionic/angular';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

// Components
import { SongListComponent } from './profile/music/song-list/song-list.component';
import { SongSearchComponent } from './profile/music/song-search/song-search.component';
import { AppComponent } from './app.component';

// Models
import { AppRoutingModule } from './app-routing.module';
import { SongSwipingComponent } from './song-swiping/song-swiping.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SettingsComponent} from './profile/settings/settings.component';
import { PersSettingsComponent } from './profile/settings/pers-settings/pers-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongSearchComponent,
    SongSwipingComponent,
    SettingsComponent,
    PersSettingsComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
