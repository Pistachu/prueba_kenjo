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

  createArtist(artist): Promise<any> {
    return this.httpClient.post<any>(`${environment.apiURL}/artist`, artist).toPromise();
  }

  deleteArtist(id): Promise<Artist> {
    return this.httpClient.delete<Artist>(`${environment.apiURL}/artist/${id}`).toPromise();
  }

  updateArtist(id, artist): Promise<any> {
    return this.httpClient.put<any>(`${environment.apiURL}/artist/${id}`, artist).toPromise();
  }
}
