import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from 'src/app/artists/artist.service';
import { Artist } from 'src/app/models/artist.model';
import { AlbumsService } from '../albums.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {

  addNewForm: FormGroup;
  arrArtists: Artist[] = [];

  constructor(private artistService: ArtistService, private albumsService: AlbumsService, private router: Router) { }

  async ngOnInit() {

    this.addNewForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      artistId: new FormControl('', [
        Validators.required
      ]),
      coverUrl: new FormControl('', [
        Validators.required,
      ]),
      year: new FormControl('', [
        Validators.required,
        Validators.min(1909),
        Validators.max(2030)
      ]),
      genre: new FormControl('', [
        Validators.required,
      ])
    });

    this.arrArtists = await this.artistService.getAll();
  }

  onSubmit() {
    this.albumsService.createAlbum(this.addNewForm.value)
      .then(response => {
        if (response) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            title: `<h3><strong>Album created successfully<strong><h3>`
          });
          this.router.navigate(['/albums']);
        }
      })
      .catch(err => {
        if (err.error.error.includes('duplicate key error')) {
          Swal.fire({
            icon: 'error',
            title: 'Album already exist.',
            text: 'Please, choose another album title.'
          })
        }
      });
  }
}
