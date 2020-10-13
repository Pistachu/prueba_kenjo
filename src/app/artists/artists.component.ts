import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist.model';
import { ArtistService } from './artist.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  artistsArr: Artist[] = [];

  constructor(private artistService: ArtistService) { }

  async ngOnInit() {
    this.artistsArr = await this.artistService.getAll();
    console.log(this.artistsArr);
  }

}
