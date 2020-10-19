import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Artist[]> {
    return this.httpClient.get<Artist[]>(`${environment.apiURL}/artists/all`).toPromise();
  }

  getArtist(id): Promise<Artist> {
    return this.httpClient.get<Artist>(`${environment.apiURL}/artist/${id}`).toPromise();
  }
}
