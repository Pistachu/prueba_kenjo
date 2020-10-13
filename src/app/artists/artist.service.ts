import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  baseUrl: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Artist[]> {
    return this.httpClient.get<Artist[]>(`${this.baseUrl}/artists/all`).toPromise();
  }
}
