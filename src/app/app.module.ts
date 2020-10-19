import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistsComponent } from './artists/artists.component';
import { AlbumsComponent } from './albums/albums.component';
import { HttpClientModule } from '@angular/common/http';
import { AlbumDetailComponent } from './albums/album-detail/album-detail.component';
import { NewAlbumComponent } from './albums/new-album/new-album.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtistDetailComponent } from './artists/artist-detail/artist-detail.component';
import { NewArtistComponent } from './artists/new-artist/new-artist.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    AlbumsComponent,
    AlbumDetailComponent,
    NewAlbumComponent,
    ArtistDetailComponent,
    NewArtistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
