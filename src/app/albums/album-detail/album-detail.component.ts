import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from 'src/app/artists/artist.service';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { AlbumsService } from '../albums.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  id: string;
  album: Album;
  artist: Artist;
  editForm: FormGroup;
  arrArtists: Artist[] = [];
  showEdit: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private albumsService: AlbumsService, private artistService: ArtistService) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.id = params.id;
      this.album = await this.albumsService.getAlbum(params.id);
      this.artist = await this.artistService.getArtist(this.album.artistId);
    });

    this.editForm = new FormGroup({
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

  onDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.albumsService.deleteAlbum(this.id)
          .then(album => {
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
              title: `<h3><strong>The album "${album.title}" has been deleted<strong><h3>`
            });
            this.router.navigate(['/albums']);
          });
      }
    })
  }

  onEdit() {
    this.showEdit = !this.showEdit;
  }

  onSubmit() {
    this.albumsService.updateAlbum(this.id, this.editForm.value)
      .then(album => {
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
          title: `<h3><strong>The album "${album.title}" has been updated<strong><h3>`
        });
        this.router.navigate(['/albums']);
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
