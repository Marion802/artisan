import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {
  private dataUrl = '/datas/datas.json'; // Chemin vers votre fichier JSON

  constructor(private http: HttpClient) { }

  getArtisans(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  getArtisanById(id: string): Observable<any> {
    return this.http.get<any>(`${this.dataUrl}/${id}`);
  }
}