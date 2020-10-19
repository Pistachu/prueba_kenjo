import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../models/artist.model';
import { ArtistService } from './artist.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  artistsArr: Artist[] = [];

  constructor(private artistService: ArtistService, private router: Router) { }

  async ngOnInit() {
    this.artistsArr = await this.artistService.getAll();
  }

  onClickArtist(artist) {
    this.router.navigate(['/artists', artist._id]);
  }

  onClickAdd() {
    this.router.navigate(['/artists', 'new']);
  }

}
