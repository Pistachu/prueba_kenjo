import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '../models/album.model';
import { AlbumsService } from './albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albumsArr: Album[] = [];

  showButtons: boolean = false;

  constructor(private albumsService: AlbumsService, private router: Router) { }

  async ngOnInit() {
    this.albumsArr = await this.albumsService.getAll();
  }

  onClickAlbum(album) {
    this.router.navigate(['/albums', album._id]);
  }

  onClickAdd() {
    this.router.navigate(['/albums', 'new']);
  }

}
