import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArtistService } from '../artist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-artist',
  templateUrl: './new-artist.component.html',
  styleUrls: ['./new-artist.component.css']
})
export class NewArtistComponent implements OnInit {

  addNewForm: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(private artistService: ArtistService, private router: Router) { }

  ngOnInit(): void {
    this.addNewForm = new FormGroup({
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

  onSubmit() {
    this.artistService.createArtist(this.addNewForm.value)
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
            title: `<h3><strong>Artist created successfully<strong><h3>`
          });
          this.router.navigate(['/artists']);
        }
      })
      .catch(err => {
        if (err.error.error.includes('duplicate key error')) {
          Swal.fire({
            icon: 'error',
            title: 'Artist already exist.',
            text: 'Please, choose another artist name.'
          })
        }
      });
  }

}
