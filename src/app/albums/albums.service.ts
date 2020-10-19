import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Album } from '../models/album.model';


@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Album[]> {
    return this.httpClient.get<Album[]>(`${environment.apiURL}/albums/all`).toPromise();
  }

  getAlbum(id): Promise<Album> {
    return this.httpClient.get<Album>(`${environment.apiURL}/album/${id}`).toPromise();
  }

  deleteAlbum(id): Promise<Album> {
    return this.httpClient.delete<Album>(`${environment.apiURL}/album/${id}`).toPromise();
  }

  createAlbum(album): Promise<any> {
    return this.httpClient.post<any>(`${environment.apiURL}/album`, album).toPromise();
  }

  updateAlbum(id, album): Promise<any> {
    return this.httpClient.put<any>(`${environment.apiURL}/album/${id}`, album).toPromise();
  }

}
