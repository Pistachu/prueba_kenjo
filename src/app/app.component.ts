import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kenjo-cd-collection';

  constructor(private router: Router) { }

  onclick(ruta: string) {
    this.router.navigate([ruta]);
  }
}
