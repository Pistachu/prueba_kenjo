import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumDetailComponent } from './albums/album-detail/album-detail.component';
import { AlbumsComponent } from './albums/albums.component';
import { NewAlbumComponent } from './albums/new-album/new-album.component';
import { ArtistDetailComponent } from './artists/artist-detail/artist-detail.component';
import { ArtistsComponent } from './artists/artists.component';
import { NewArtistComponent } from './artists/new-artist/new-artist.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/artists' },
  { path: 'artists', component: ArtistsComponent },
  { path: 'artists/new', component: NewArtistComponent },
  { path: 'artists/:id', component: ArtistDetailComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'albums/new', component: NewAlbumComponent },
  { path: 'albums/:id', component: AlbumDetailComponent },
  { path: '**', redirectTo: '/artists' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
