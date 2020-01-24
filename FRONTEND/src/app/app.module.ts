//Modules from angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { IonicModule } from '@ionic/angular';
import {MatButtonModule} from '@angular/material/button';


//Components
import { SongListComponent } from './profile/music/song-list/song-list.component';
import { SongSearchComponent } from './profile/music/song-search/song-search.component';
import { AppComponent } from './app.component';
import { SongSwipingComponent } from './song-swiping/song-swiping.component';

//Models
import { AppRoutingModule } from './app-routing.module';
import {RouterTestingModule} from "@angular/router/testing";


@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongSearchComponent,
    SongSwipingComponent,
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
