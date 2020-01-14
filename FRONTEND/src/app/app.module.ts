//Modules from angular
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

//Components
import { SongListComponent } from './profile/music/song-list/song-list.component';
import { SongSearchComponent } from './profile/music/song-search/song-search.component';
import { AppComponent } from './app.component';
//Models
import { AppRoutingModule } from './app-routing.module';
import { SongSwipingComponent } from './song-swiping/song-swiping.component';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongSearchComponent,
    SongSwipingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    IonicModule,
    MatSnackBarModule,
    RouterModule, //KB: Exported Routing (app-routing.module.ts)
    MatListModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
