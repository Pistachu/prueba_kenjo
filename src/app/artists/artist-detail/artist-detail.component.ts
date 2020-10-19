import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../artist.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Artist } from 'src/app/models/artist.model';
import { formatDate } from '@angular/common';
import { Album } from 'src/app/models/album.model';
import { AlbumsService } from 'src/app/albums/albums.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

  id: string;
  artist: Artist;
  arrAlbums: Album[] = [];
  editForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  birthdate: string = '';
  deathDate: string = '';
  showEdit: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private artistService: ArtistService, private albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      this.id = params.id;
      this.artist = await this.artistService.getArtist(params.id);
      this.arrAlbums = await (await this.albumsService.getAll()).filter(album => album.artistId === params.id);
      this.birthdate = formatDate(this.artist.birthdate, 'yyyy-MM-dd', 'en-US');
      if (this.artist.deathDate) {
        this.deathDate = formatDate(this.artist.deathDate, 'yyyy-MM-dd', 'en-US');
      }
    });

    this.editForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      photoUrl: new FormControl('', [
        Validators.required
      ]),
      birthdate: new FormControl('', [
        Validators.required,
      ]),
      deathDate: new FormControl('')
    });
    this.minDate = new Date(1909, 0, 1);
    this.maxDate = new Date(2030, 11, 31);
  }

  onEdit() {
    this.showEdit = !this.showEdit;
  }

  onDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "The artist and it´s albums will be deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.arrAlbums !== []) {
          for (const album of this.arrAlbums) {
            this.albumsService.deleteAlbum(album._id)
              .then(result => { })
              .catch(err => {
                console.log(err);
              })
          }
        }
        this.artistService.deleteArtist(this.id)
          .then(artist => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              title: `<h3><strong>The artist "${artist.name}" has been deleted<strong><h3>`
            });
            this.router.navigate(['/artists']);
          });
      }
    })
  }

  onSubmit() {
    this.artistService.updateArtist(this.id, this.editForm.value)
      .then(artist => {
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
          title: `<h3><strong>The artist "${artist.name}" has been updated<strong><h3>`
        });
        this.router.navigate(['/artists']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Update failed',
          text: 'Please, try again.'
        })
      });
  }

}
