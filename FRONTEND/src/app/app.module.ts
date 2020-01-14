import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SongListComponent } from './profile/music/song-list/song-list.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { SongSearchComponent } from './profile/music/song-search/song-search.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    IonicModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      {path: 'song-list', component: SongListComponent},
      {path: 'song-search', component: SongSearchComponent}
    ]),
    MatListModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
